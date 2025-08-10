import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Utility function to generate JWT and set it in a cookie
const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30m', // Token will expire in 30 min
    });

    res.cookie('jwt', token, {
        httpOnly: true, // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Mitigates CSRF attacks
        maxAge: 30 * 60 * 1000, // 30 min in milliseconds
    });
};

// @desc      Register a new user
// @route     POST /api/v1/signup
export const signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all fields.' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            generateToken(res, user._id);
            res.status(201).json({
                success: true,
                message: 'User registered successfully!',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        } else {
            res.status(400).json({ success: false, message: 'Invalid user data.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc      Authenticate user & get token
// @route     POST /api/v1/login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            generateToken(res, user._id);
            res.status(200).json({
                success: true,
                message: 'Login successful!',
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};