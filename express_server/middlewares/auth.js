// middlewares/auth.js
let JWT_SECRET = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ message: "No token provided" });
    }
};