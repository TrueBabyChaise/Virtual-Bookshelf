const jwtOptions = require('./jwtOptions');
const jwt = require('jsonwebtoken');

module.exports = function authToken(req, res, next) {
    let authcookie = req.cookies.access_token
    if (authcookie == null) return res.sendStatus(401);

    jwt.verify(authcookie, jwtOptions.secretOrKey, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}