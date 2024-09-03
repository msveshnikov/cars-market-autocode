const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost/cars_market", {
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
        const cars = await Car.find(req.query);
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const loadCSVData = async () => {
    const results = [];
    fs.createReadStream(path.join(__dirname, "autos.csv"))
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
            try {
                await Car.insertMany(results);
                console.log("CSV data loaded successfully");
            } catch (error) {
                console.error("Error loading CSV data:", error);
            }
        });
};

const initializeDatabase = async () => {
    const count = await Car.countDocuments();
    if (count === 0) {
        console.log("Database is empty. Loading CSV data...");
        await loadCSVData();
    } else {
        console.log("Database already contains data");
    }
};

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await initializeDatabase();
});
