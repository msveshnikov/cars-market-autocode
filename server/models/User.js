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
    compareList: [
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
    preferences: {
        darkMode: {
            type: Boolean,
            default: false,
        },
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
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

userSchema.methods.addToCompareList = async function (carId) {
    if (!this.compareList.includes(carId)) {
        this.compareList.push(carId);
        await this.save();
    }
};

userSchema.methods.removeFromCompareList = async function (carId) {
    this.compareList = this.compareList.filter((id) => id.toString() !== carId.toString());
    await this.save();
};

userSchema.methods.toggleDarkMode = async function () {
    this.preferences.darkMode = !this.preferences.darkMode;
    await this.save();
};

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
};

const User = mongoose.model("User", userSchema);

export default User;
