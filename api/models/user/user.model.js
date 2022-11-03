const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required:true},
    fkRole: {type: Number, required:true},
    bookUserInfos: [{type: mongoose.Schema.Types.ObjectId, ref: 'bookUserInfo'}]
});
const UserModel = mongoose.model('user', User);

User.pre('deleteOne', function(next) {
    this.model('bookUserInfo').deleteMany({ fkUser: this._id }, next);
});

User.pre('deleteMany', function(next) {
    this.model('bookUserInfo').deleteMany({ fkUser: this._id }, next);
});


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

    async createUser({username, password}) {
        const userFound = await findOneByName(username);
        if (!userFound) {
            const user = new UserModel({username, password, fkRole:0});
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

