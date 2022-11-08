const { createBookEntry, findOneBookByISBN } = require("@models/book/book.model");
const mongoose = require('mongoose');
const BookUserInfo = new mongoose.Schema({
    personnalTitle: {type: String},
    note: {type: String},
    score: {type: Number},
    status: {type: Number},
    isbn: {type: String, required: true},
    fkUser: {type: mongoose.ObjectId, ref: 'user', required:true},
    fkBook: {type: mongoose.ObjectId, ref: 'book', required:true}
});

const BookUserInfoModel = mongoose.model('bookUserInfo', BookUserInfo);

async function findAllBookUserInfoOfUser({fkUser}) {
    const bookFound = await BookUserInfoModel.find({ fkUser })
    if (bookFound)
        return bookFound;
    return undefined;
}

async function findOneBookUserInfoByISBN({isbn, fkUser}) {
    const bookFound = await BookUserInfoModel.find({ isbn, fkUser })
    if (bookFound.length)
        return bookFound[0];
    return undefined;
}

async function removeBookUserInfoByISBN({isbn, fkUser}) {
    const bookFound = await BookUserInfoModel.findOneAndDelete({ isbn, fkUser })
    if (bookFound)
        return bookFound;
    return undefined;
}

async function updateBookUserInfoByISBN({isbn, fkUser, newParams}) {
    const bookFound = await BookUserInfoModel.findOneAndUpdate({ isbn, fkUser }, newParams)
    if (bookFound)
        return bookFound;
    return undefined;
}

async function findOneBookUserInfoByBookId({fkBook, fkUser}) {
    const bookFound = await BookUserInfoModel.find({ fkBook, fkUser })
    if (bookFound.length)
        return bookFound[0];
    return undefined;
}

async function removeBookUserInfoByBookId({fkBook, fkUser}) {
    const bookFound = await BookUserInfoModel.findOneAndDelete({ fkBook, fkUser })
    if (bookFound)
        return bookFound;
    return undefined;
}

async function updateBookUserInfoByBookId({fkBook, fkUser, newParams}) {
    const bookFound = await BookUserInfoModel.findOneAndUpdate({ fkBook, fkUser }, newParams)
    if (bookFound)
        return bookFound;
    return undefined;
}


module.exports = {
    findOneBookUserInfoByISBN,
    removeBookUserInfoByISBN,
    updateBookUserInfoByISBN,
    findOneBookUserInfoByBookId,
    removeBookUserInfoByBookId,
    updateBookUserInfoByBookId,
    findAllBookUserInfoOfUser,

    async createBookUserInfoEntry({isbn,fkUser}) {
        const bookFound = await findOneBookUserInfoByISBN({isbn, fkUser});
        if (!bookFound) {
            let book = await findOneBookByISBN({isbn})
			if (!book)
				book = await createBookEntry({isbn})
            const bookUserInfo = new BookUserInfoModel({isbn, fkUser, fkBook: book._id});
            bookUserInfo.save();
            return bookUserInfo;
        }
        return false;
    },
}
