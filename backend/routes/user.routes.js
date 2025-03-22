const express = require('express');
const { body, validationResult } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Validation Middleware
const validateUser = (validations) => [
    ...validations,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Register User
router.post('/register',
    validateUser([
        body('email').isEmail().withMessage('Invalid Email'),
        body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ]),
    userController.registerUser
);

// Login User
router.post('/login',
    validateUser([
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    ]),
    userController.loginUser
);

// Get User Profile (Protected Route)
router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

// Logout User (Changed to POST for better security)
router.post('/logout', authMiddleware.authUser, userController.logoutUser);

module.exports = router;
