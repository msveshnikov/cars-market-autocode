import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        yearofregistration: {
            type: Number,
            index: true,
        },
        brand: {
            type: String,
            index: true,
        },
        model: {
            type: String,
            index: true,
        },
        vehicletype: {
            type: String,
        },
        gearbox: {
            type: String,
        },
        kilometer: {
            type: Number,
        },
        powerps: {
            type: Number,
        },
        fueltype: {
            type: String,
        },
        notrepaireddamage: {
            type: String,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

carSchema.index({ brand: 1, model: 1, yearofregistration: 1 });

carSchema.statics.findByFilters = async function (filters, page = 1, limit = 50) {
    const query = {};
    for (const key in filters) {
        if (filters[key]) {
            if (["yearofregistration", "kilometer", "powerps", "price"].includes(key)) {
                const { min, max } = filters[key];
                query[key] = { $gte: Number(min), $lte: Number(max) };
            } else if (Array.isArray(filters[key])) {
                query[key] = { $in: filters[key] };
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

carSchema.statics.getDistinctBrands = async function () {
    return this.distinct("brand");
};

carSchema.statics.getDistinctModels = async function (brand) {
    return this.distinct("model", { brand });
};

carSchema.statics.getMinMaxValues = async function () {
    const [result] = await this.aggregate([
        {
            $group: {
                _id: null,
                minYear: { $min: "$yearofregistration" },
                maxYear: { $max: "$yearofregistration" },
                minKilometer: { $min: "$kilometer" },
                maxKilometer: { $max: "$kilometer" },
                minPowerPS: { $min: "$powerps" },
                maxPowerPS: { $max: "$powerps" },
                minPrice: { $min: "$price" },
                maxPrice: { $max: "$price" },
            },
        },
    ]);
    return result;
};

carSchema.statics.getComparableCars = async function (carId, limit = 5) {
    const car = await this.findById(carId);
    if (!car) return [];

    return this.find({
        brand: car.brand,
        model: car.model,
        yearofregistration: { $gte: car.yearofregistration - 2, $lte: car.yearofregistration + 2 },
        _id: { $ne: car._id },
    })
        .limit(limit)
        .sort({ yearofregistration: -1, price: 1 });
};

carSchema.statics.getFavorites = async function (favoriteIds) {
    return this.find({ _id: { $in: favoriteIds } });
};

const Car = mongoose.model("Car", carSchema);

export default Car;
