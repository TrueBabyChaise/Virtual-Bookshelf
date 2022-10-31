const bcrypt = require('bcrypt');
const saltRounds = 11;

module.exports = {

    async createHash(password) {
        return await bcrypt.hash(password, saltRounds);
        },

    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
}
