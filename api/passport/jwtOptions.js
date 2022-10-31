const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = {
    secretOrKey: "69dec153dd693f69c368d31fca1258ede9azd32332323jiojdzaf75d2d89e1f7f8416cedca20725bad055ed76d82621faad4e32ac4967a0d9edcc",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
