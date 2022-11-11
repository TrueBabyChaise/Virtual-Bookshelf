const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    fkRole: {type: Number, required:true},
});

const UserModel = mongoose.model('user', User);

async function findOneByEmail(email) {
    const userFound = await UserModel.find({ email })
    if (userFound.length)
        return userFound[0];
    return undefined;
}

async function findOneByName(username) {
    const userFound = await UserModel.find({ username })
    if (userFound.length)
        return userFound[0];
    return undefined;
}

async function findOneById(_id) {
    const userFound = await UserModel.find({ _id })
    if (userFound.length)
        return userFound[0];
    return undefined;
}

module.exports = {
    findOneByName,
    findOneByEmail,
    findOneById,

    async createUser({email, username, password}) {
        const userFound = await findOneByEmail(email);
        if (!userFound) {
            const user = new UserModel({email, username, password, fkRole:0});
            user.save();
            return true;
        }
        return false;
    },

    async getUserRole({ userId }) {
        const userFound = await findOneById(userId);
        if (!userFound) {
            return false;
        }
        return userFound.fkRole;
    }
}

