const jwt = require("jsonwebtoken");

const tokenKey = process.env.TOKEN_KEY || "QWERTYUIOP";

const verifyToken = (token) => jwt.verify(token, tokenKey);

const decodeToken = (token) => jwt.decode(token);

const createToken = (tokenData) =>
    jwt.sign(
        {
            user_id: tokenData.email,
            email: tokenData.email
        },
        tokenKey,
        {
            expiresIn: "2h",
        }
    );

export { verifyToken, decodeToken, createToken };