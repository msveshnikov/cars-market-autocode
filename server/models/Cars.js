import mongoose from "mongoose";

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

carSchema.index({ brand: 1, model: 1, yearofregistration: 1 });

const Car = mongoose.model("Car", carSchema);

export default Car;
