const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const pricing = {
        auto: { baseFare: 30, perKm: 10, perMin: 2 },
        car: { baseFare: 50, perKm: 15, perMin: 3 },
        moto: { baseFare: 20, perKm: 8, perMin: 1.5 }
    };

    return Object.keys(pricing).reduce((fare, type) => {
        fare[type] = Math.round(
            pricing[type].baseFare +
            (distanceTime.distance.value / 1000) * pricing[type].perKm +
            (distanceTime.duration.value / 60) * pricing[type].perMin
        );
        return fare;
    }, {});
}

function generateOtp(length = 6) {
    return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
}

async function createRide({ user, pickup, destination, vehicleType }) {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);
    if (!fare[vehicleType]) {
        throw new Error('Invalid vehicle type');
    }

    return rideModel.create({
        user,
        pickup,
        destination,
        otp: generateOtp(),
        fare: fare[vehicleType],
        status: 'pending'
    });
}

async function confirmRide({ rideId, captain }) {
    if (!rideId || !captain) {
        throw new Error('Ride ID and captain are required');
    }

    const updatedRide = await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'accepted', captain: captain._id },
        { new: true }
    ).populate('user captain').select('+otp');

    if (!updatedRide) {
        throw new Error('Ride not found');
    }
    return updatedRide;
}

async function startRide({ rideId, otp, captain }) {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }

    const ride = await rideModel.findOne({ _id: rideId }).populate('user captain').select('+otp');
    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'accepted') throw new Error('Ride not accepted');
    if (ride.otp !== otp) throw new Error('Invalid OTP');

    ride.status = 'ongoing';
    await ride.save();
    return ride;
}

async function endRide({ rideId, captain }) {
    if (!rideId) throw new Error('Ride ID is required');

    const ride = await rideModel.findOne({ _id: rideId, captain: captain._id }).populate('user captain').select('+otp');
    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'ongoing') throw new Error('Ride not ongoing');

    ride.status = 'completed';
    await ride.save();
    return ride;
}

module.exports = { getFare, createRide, confirmRide, startRide, endRide };

