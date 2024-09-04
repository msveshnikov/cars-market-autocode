import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Car",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastLogin: {
        type: Date,
    },
    darkMode: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.addToFavorites = async function (carId) {
    if (!this.favorites.includes(carId)) {
        this.favorites.push(carId);
        await this.save();
    }
};

userSchema.methods.removeFromFavorites = async function (carId) {
    this.favorites = this.favorites.filter((id) => id.toString() !== carId.toString());
    await this.save();
};

userSchema.methods.toggleDarkMode = async function () {
    this.darkMode = !this.darkMode;
    await this.save();
};

const User = mongoose.model("User", userSchema);

export default User;
