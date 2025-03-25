const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

module.exports.createUser = async ({ firstname, lastname, email, password }) => {
    try {
        if (!firstname || !email || !password) {
            throw new Error('Firstname, email, and password are required');
        }

        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await userModel.create({
            fullname: { firstname, lastname },
            email,
            password: hashedPassword
        });

        return user;
    } catch (error) {
        throw new Error(`User creation failed: ${error.message}`);
    }
};
