const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            minlength: [3, 'First name must be at least 3 characters long'],
            trim: true,
        },
        lastName: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
            minlength: [5, 'Email must be at least 5 characters long'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            select: false, // Prevents password from being returned in queries
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        socketId: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true } // Automatically adds createdAt & updatedAt
);

// 🔒 Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// 🔑 Generate JWT Token
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' } // Configurable expiration
    );
};

// 🔄 Compare Password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// 🔄 Hash Password (Static Method)
userSchema.statics.hashPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
