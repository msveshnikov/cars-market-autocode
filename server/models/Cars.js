import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  yearofregistration: {
    type: Number,
    required: true,
    index: true,
  },
  brand: {
    type: String,
    required: true,
    index: true,
  },
  model: {
    type: String,
    required: true,
    index: true,
  },
  vehicletype: {
    type: String,
    required: true,
    enum: ["limousine", "coupe", "kleinwagen", "suv", "kombi", "cabrio", "bus", "andere"],
  },
  gearbox: {
    type: String,
    required: true,
    enum: ["manuell", "automatik"],
  },
  kilometer: {
    type: Number,
    required: true,
  },
  powerps: {
    type: Number,
    required: true,
  },
  fueltype: {
    type: String,
    required: true,
    enum: ["benzin", "diesel", "hybrid", "lpg", "cng", "elektro", "andere"],
  },
  notrepaireddamage: {
    type: String,
    required: true,
    enum: ["ja", "nein"],
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
}, { timestamps: true });

carSchema.index({ brand: 1, model: 1, yearofregistration: 1 });

carSchema.statics.findByFilters = async function(filters, page = 1, limit = 50) {
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

  const totalCount = await this.countDocuments(query);
  const cars = await this.find(query)
    .sort({ yearofregistration: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return {
    cars,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
  };
};

const Car = mongoose.model("Car", carSchema);

export default Car;