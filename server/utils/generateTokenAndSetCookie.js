const jwt = require("jsonwebtoken");
function generateTokenAndSetCookie(userId, res){
    if (!userId || !res) {
        throw new Error("UserId and response object must be provided");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite: 'strict',
    });

    return token;
};

module.exports = generateTokenAndSetCookie;
