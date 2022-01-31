const jwt = require("jsonwebtoken");

const tokenKey = process.env.TOKEN_KEY || "QWERTYUIOP";

const verifyToken = (token) => jwt.verify(token, tokenKey);

const decodeToken = (token) => jwt.decode(token);

const createToken = (tokenData) => {
    const tokenObject =         {
        user_id: tokenData.email,
        email: tokenData.email,
        firstName: tokenData.first_name,
        lastName: tokenData.last_name
    };

    return jwt.sign(
        tokenObject,
        tokenKey,
        {
            expiresIn: "2h",
        }
    );
}

export { verifyToken, decodeToken, createToken };