const jwtOptions = require('./jwtOptions');
const jwt = require('jsonwebtoken');

module.exports = function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (authHeader == null) return res.sendStatus(401);

    jwt.verify(authHeader, jwtOptions.secretOrKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}
