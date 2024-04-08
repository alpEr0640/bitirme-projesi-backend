const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("yetkiniz yok")
    }
    try {
        const decodedToken = jwt.verify(token, "jwtPrivateKey");
        req.register = decodedToken;
        next();
    }
    catch(err) {
        res.send(err)
    }
}