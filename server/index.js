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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cars_market", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const carSchema = new mongoose.Schema({
  yearofregistration: Number,
  brand: String,
  model: String,
  vehicletype: String,
  gearbox: String,
  kilometer: Number,
  powerps: Number,
  fueltype: String,
  notrepaireddamage: String,
  price: Number,
  image: String,
});

const Car = mongoose.model("Car", carSchema);

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
    res.status(500).json({ message: error.message });
  }
  httpRequestDurationMicroseconds
    .labels(req.method, req.route.path, res.statusCode)
    .observe(Date.now() - res.locals.startEpoch);
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
    console.error("Error fetching car image:", error);
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
          console.log("CSV data loaded successfully");
          resolve();
        } catch (error) {
          console.error("Error loading CSV data:", error);
          reject(error);
        }
      });
  });
};

const initializeDatabase = async () => {
  try {
    const count = await Car.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Loading CSV data...");
      await loadCSVData();
    } else {
      console.log("Database already contains data");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await initializeDatabase();
});

export default app;