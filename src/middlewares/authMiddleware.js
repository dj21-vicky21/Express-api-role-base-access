const jwt = require('jsonwebtoken')

const verifyToken = async (req, res, next) => {
    try {
        let token
        let authHeader = req.headers.Authorization || req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized user!" })
        }

        token = authHeader?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ error: "Unauthorized user!" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next()

    } catch (error) {
        res.status(401).json({ error: "Invalid token!" })
    }
}

const authorizeRole = (...allowedRoles) => {
    try {
        return (req, res, next) => {
            if (!allowedRoles.includes(req?.user?.role)) {
                return res.status(403).json({ message: "Access denied!" })
            }
            next()
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" })
    }
}

module.exports = {
    verifyToken,
    authorizeRole
}