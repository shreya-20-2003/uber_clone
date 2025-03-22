const express = require('express');
const { body, query, validationResult } = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Middleware to handle validation errors
const validate = (validations) => [
    ...validations,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Create Ride (Protected Route)
router.post('/create',
    authMiddleware.authUser,
    validate([
        body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
        body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type')
    ]),
    rideController.createRide
);

// Get Fare (Protected Route)
router.get('/get-fare',
    authMiddleware.authUser,
    validate([
        query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address')
    ]),
    rideController.getFare
);

// Confirm Ride (Captain Protected Route)
router.post('/confirm',
    authMiddleware.authCaptain,
    validate([
        body('rideId').isMongoId().withMessage('Invalid ride ID')
    ]),
    rideController.confirmRide
);

// Start Ride (Changed to POST for better security)
router.post('/start-ride',
    authMiddleware.authCaptain,
    validate([
        body('rideId').isMongoId().withMessage('Invalid ride ID'),
        body('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP')
    ]),
    rideController.startRide
);

// End Ride (Captain Protected Route)
router.post('/end-ride',
    authMiddleware.authCaptain,
    validate([
        body('rideId').isMongoId().withMessage('Invalid ride ID')
    ]),
    rideController.endRide
);

module.exports = router;
