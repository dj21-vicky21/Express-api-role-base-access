const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { expiresIn, roles } = require("../lib/utils");

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check for required fields
        if (!username || !password) {
            return res.status(400).json({ message: `Registration fields are required` });
        }

        if (role != undefined && !roles.includes(role)) {
            return res.status(400).json({ message: `Invalid role` });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            password: hashPassword,
            role: role || 'user' // Default to 'user' if no role is provided
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: `User registered with username ${username}!` });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            return res.status(400).json({ error: 'Username already exists!' });
        }
        console.error('Error saving user:', error);
        return res.status(500).json({ error: 'Something went wrong!' });
    }
};

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: `Registration fields are required!` });
        }

        // Find the user by username
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        // Verify the password
        const verifyUser = await bcrypt.compare(password, user.password);
        if (!verifyUser) {
            return res.status(401).json({ message: `Unauthorized User` });
        }

        // Generate a token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the token in the response
        return res.status(200).json({
            type: "bearer",
            token,
            expiresIn: expiresIn(1)
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Something went wrong!" });
    }
};

module.exports = {
    register,
    signIn
}