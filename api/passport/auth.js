const passportJWT = require('passport-jwt');
const { getUser } = require('../models/user/user.model');
const jwtOptions = require('./jwtOptions');
const jwt = require('jsonwebtoken');
let JwtStrategy = passportJWT.Strategy;

// lets create our strategy for web token
module.exports = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    let user = getUser({ id: jwt_payload.id });

    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});
