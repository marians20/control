const jwt = require("jsonwebtoken");

const tokenKey = process.env.TOKEN_KEY || "QWERTYUIOP";

const verifyToken = (req, res, next) => {
    const authenticationHeader = req.headers["authorization"];
    const token = authenticationHeader && authenticationHeader.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, tokenKey);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return next();
};

module.exports = verifyToken;