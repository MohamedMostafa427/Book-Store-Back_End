
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign(
        { email: user.email, id: user._id }, 
        process.env.ACCESS_TOKEN_SECRET_KEY, 
        { expiresIn: '10m' }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
};

module.exports = {
    generateToken,
    verifyToken
};
