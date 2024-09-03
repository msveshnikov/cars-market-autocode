/* global use, db */

// MongoDB Playground
use("cars_market");

// Insert sample data
db.cars.insertMany([
    {
        yearofregistration: 2018,
        brand: "Toyota",
        model: "Camry",
        vehicletype: "sedan",
        gearbox: "automatic",
        kilometer: 50000,
        powerps: 200,
        fueltype: "gasoline",
        notrepaireddamage: "nein",
        price: 25000,
        image: "https://example.com/toyota-camry.jpg",
    },
    {
        yearofregistration: 2019,
        brand: "Honda",
        model: "Civic",
        vehicletype: "hatchback",
        gearbox: "manual",
        kilometer: 30000,
        powerps: 180,
        fueltype: "gasoline",
        notrepaireddamage: "nein",
        price: 22000,
        image: "https://example.com/honda-civic.jpg",
    },
    {
        yearofregistration: 2020,
        brand: "Tesla",
        model: "Model 3",
        vehicletype: "sedan",
        gearbox: "automatic",
        kilometer: 20000,
        powerps: 280,
        fueltype: "electric",
        notrepaireddamage: "nein",
        price: 45000,
        image: "https://example.com/tesla-model3.jpg",
    },
]);

// Create indexes for improved search performance
db.cars.createIndex({ brand: 1, model: 1 });
db.cars.createIndex({ yearofregistration: 1 });
db.cars.createIndex({ price: 1 });
db.cars.createIndex({ kilometer: 1 });
db.cars.createIndex({ fueltype: 1 });

// Sample query to search for cars
const searchQuery = {
    brand: "Toyota",
    yearofregistration: { $gte: 2018 },
    price: { $lte: 30000 },
    kilometer: { $lte: 60000 },
    fueltype: "gasoline",
};

db.cars.find(searchQuery).limit(10).toArray();

// Aggregation pipeline to get average price by brand
db.cars
    .aggregate([
        {
            $group: {
                _id: "$brand",
                avgPrice: { $avg: "$price" },
            },
        },
        {
            $sort: { avgPrice: -1 },
        },
    ])
    .toArray();

// Update car prices (e.g., apply a discount)
db.cars.updateMany({ fueltype: "electric" }, { $mul: { price: 0.9 } });

// Delete old listings
db.cars.deleteMany({ yearofregistration: { $lt: 2015 } });

// Count documents
db.cars.countDocuments();

// Distinct brands
db.cars.distinct("brand");
