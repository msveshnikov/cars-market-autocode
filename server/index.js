import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

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
});

const Car = mongoose.model("Car", carSchema);

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find(req.query);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/search", async (req, res) => {
  try {
    const query = {};
    for (const key in req.query) {
      if (req.query[key]) {
        if (["yearofregistration", "kilometer", "powerps", "price"].includes(key)) {
          query[key] = Number(req.query[key]);
        } else {
          query[key] = { $regex: new RegExp(req.query[key], "i") };
        }
      }
    }
    const cars = await Car.find(query).limit(50);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/cars/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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