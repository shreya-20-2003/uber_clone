const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType
}) => {
    // Validate required fields
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    // Start a Mongoose session for transaction safety
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Check if captain already exists
        const existingCaptain = await captainModel.findOne({ email }).session(session);
        if (existingCaptain) {
            throw new Error('Captain with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new captain
        const captain = await captainModel.create([{
            fullname: {
                firstname,
                lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color,
                plate,
                capacity,
                vehicleType
            }
        }], { session });

        // Commit transaction
        await session.commitTransaction();
        session.endSession();

        // Return safe response
        return {
            id: captain[0]._id,
            fullname: captain[0].fullname,
            email: captain[0].email,
            vehicle: captain[0].vehicle
        };
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw new Error(error.message || 'Error creating captain');
    }
};
