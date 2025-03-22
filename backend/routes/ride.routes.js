const express = require('express');
const { body } = require("express-validator");
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation middleware for registration
const validateCaptainRegistration = [
    body('email').isEmail().withMessage('Invalid Email').trim(),
    body('fullname.firstname')
        .isLength({ min: 3 }).withMessage('First name must be at least 3 characters long')
        .trim(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim(),
    body('vehicle.color')
        .isLength({ min: 3 }).withMessage('Color must be at least 3 characters long')
        .trim(),
    body('vehicle.plate')
        .isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long')
        .trim(),
    body('vehicle.capacity')
        .isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType')
        .isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
];

// Validation middleware for login
const validateCaptainLogin = [
    body('email').isEmail().withMessage('Invalid Email').trim(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim()
];

// Register a new captain
router.post('/register', validateCaptainRegistration, captainController.registerCaptain);

// Captain login
router.post('/login', validateCaptainLogin, captainController.loginCaptain);

// Get captain profile (Protected Route)
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

// Logout captain (Changed to POST for better security)
router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;
