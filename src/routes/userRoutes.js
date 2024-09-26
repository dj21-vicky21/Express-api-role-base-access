const express = require('express');
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

const router = express.Router()

// Helper function to create routes
const createRoute = (path, roles) => {
    router.get(path, verifyToken, authorizeRole(...roles), (req, res) => {
        res.json({ message: `Welcome ${req.user.role}, Currently using ${path}'s route` });
    });
};

// Define the routes using the helper function
createRoute('/admin', ['admin']);
createRoute('/manager', ['admin', 'manager']);
createRoute('/user', ['admin', 'manager', 'user']);

module.exports = router
