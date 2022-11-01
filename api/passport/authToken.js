const jwtOptions = require('./jwtOptions');
const jwt = require('jsonwebtoken');

module.exports = function authToken(req, res, next) {
    let authHeader = req.headers['authorization'];
    if (authHeader == null || !authHeader.startsWith("Bearer ")) return res.sendStatus(401);

    authHeader = authHeader.replace("Bearer ", "")

    jwt.verify(authHeader, jwtOptions.secretOrKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
