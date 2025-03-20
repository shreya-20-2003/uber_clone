const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Captain',
    },
    pickup: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    fare: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
      default: 'pending',
    },
    duration: {
      type: Number,
      min: 0,
    }, // in seconds
    distance: {
      type: Number,
      min: 0,
    }, // in meters
    payment: {
      id: { type: String, trim: true },
      orderId: { type: String, trim: true },
      signature: { type: String, trim: true },
    },
    otp: {
      type: String,
      select: false,
      required: true,
    },
    timestamps: {
      requestedAt: { type: Date, default: Date.now },
      startedAt: { type: Date },
      completedAt: { type: Date },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Ride', rideSchema);