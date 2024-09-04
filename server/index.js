import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { JSDOM } from "jsdom";
import prometheus from "prom-client";
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import winston from "winston";
import expressWinston from "express-winston";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "./middleware/auth.js";
import User from "./models/User.js";
import Car from "./models/Cars.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cars_market", {});

const collectDefaultMetrics = prometheus.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMicroseconds = new prometheus.Histogram({
    name: "http_request_duration_ms",
    help: "Duration of HTTP requests in ms",
    labelNames: ["method", "route", "code"],
    buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
});

app.use((req, res, next) => {
    res.locals.startEpoch = Date.now();
    next();
});

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", prometheus.register.contentType);
    res.end(await prometheus.register.metrics());
});

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: path.join(__dirname, "locales/{{lng}}/{{ns}}.json"),
        },
        fallbackLng: "en",
        preload: ["en", "es", "fr"],
    });

app.use(i18nextMiddleware.handle(i18next));

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "cars-market" },
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

app.use(
    expressWinston.logger({
        winstonInstance: logger,
        meta: true,
        msg: "HTTP {{req.method}} {{req.url}}",
        expressFormat: true,
        colorize: false,
    })
);

app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        logger.error("Error registering user:", error);
        res.status(500).json({ message: error.message });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: user._id });
    } catch (error) {
        logger.error("Error logging in:", error);
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/cars", async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;
        const cars = await Car.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Car.countDocuments();
        res.json({
            cars,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        logger.error("Error fetching cars:", error);
        res.status(500).json({ message: error.message });
    }
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(Date.now() - res.locals.startEpoch);
});

app.get("/api/search", async (req, res) => {
    try {
        const { page = 1, limit = 50, ...filters } = req.query;
        const query = {};
        for (const key in filters) {
            if (filters[key]) {
                if (["yearofregistration", "kilometer", "powerps", "price"].includes(key)) {
                    query[key] = { $gte: Number(filters[key]) };
                } else {
                    query[key] = { $regex: new RegExp(filters[key], "i") };
                }
            }
        }
        const cars = await Car.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Car.countDocuments(query);
        res.json({
            cars,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        logger.error("Error searching cars:", error);
        res.status(500).json({ message: error.message });
    }
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(Date.now() - res.locals.startEpoch);
});

app.get("/api/cars/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        if (!car.image) {
            car.image = await getCarImage(car.brand, car.model);
            await car.save();
        }
        res.json(car);
    } catch (error) {
        logger.error("Error fetching car details:", error);
        res.status(500).json({ message: error.message });
    }
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(Date.now() - res.locals.startEpoch);
});

app.get("/api/brands", async (req, res) => {
    try {
        const brands = await Car.distinct("brand");
        res.json(brands);
    } catch (error) {
        logger.error("Error fetching brands:", error);
        res.status(500).json({ message: error.message });
    }
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(Date.now() - res.locals.startEpoch);
});

app.get("/api/models", async (req, res) => {
    try {
        const { brand } = req.query;
        const models = await Car.distinct("model", { brand });
        res.json(models);
    } catch (error) {
        logger.error("Error fetching models:", error);
        res.status(500).json({ message: error.message });
    }
    httpRequestDurationMicroseconds
        .labels(req.method, req.route.path, res.statusCode)
        .observe(Date.now() - res.locals.startEpoch);
});

app.post("/api/favorites", authMiddleware, async (req, res) => {
    try {
        const { carId } = req.body;
        const user = await User.findById(req.user._id);
        if (!user.favorites.includes(carId)) {
            user.favorites.push(carId);
            await user.save();
        }
        res.json({ message: "Car added to favorites" });
    } catch (error) {
        logger.error("Error adding car to favorites:", error);
        res.status(500).json({ message: error.message });
    }
});

app.get("/api/favorites", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("favorites");
        res.json(user.favorites);
    } catch (error) {
        logger.error("Error fetching favorites:", error);
        res.status(500).json({ message: error.message });
    }
});

app.delete("/api/favorites/:carId", authMiddleware, async (req, res) => {
    try {
        const { carId } = req.params;
        const user = await User.findById(req.user._id);
        user.favorites = user.favorites.filter((id) => id.toString() !== carId);
        await user.save();
        res.json({ message: "Car removed from favorites" });
    } catch (error) {
        logger.error("Error removing car from favorites:", error);
        res.status(500).json({ message: error.message });
    }
});

const getCarImage = async (brand, model) => {
    try {
        const query = encodeURIComponent(`${brand} ${model} car`);
        const response = await fetch(`https://www.google.com/search?q=${query}&tbm=isch`);
        const html = await response.text();
        const dom = new JSDOM(html);
        const imgElements = dom.window.document.querySelectorAll("img");
        const imgSrc = imgElements[1]?.src;
        return imgSrc || "";
    } catch (error) {
        logger.error("Error fetching car image:", error);
        return "";
    }
};

const loadCSVData = async () => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, "autos.csv"))
            .pipe(csv())
            .on("data", (data) => results.push(data))
            .on("end", async () => {
                try {
                    await Car.insertMany(results);
                    logger.info("CSV data loaded successfully");
                    resolve();
                } catch (error) {
                    logger.error("Error loading CSV data:", error);
                    reject(error);
                }
            });
    });
};

const initializeDatabase = async () => {
    try {
        const count = await Car.countDocuments();
        if (count === 0) {
            logger.info("Database is empty. Loading CSV data...");
            await loadCSVData();
        } else {
            logger.info("Database already contains data");
        }
    } catch (error) {
        logger.error("Error initializing database:", error);
    }
};

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await initializeDatabase();
});

export default app;
