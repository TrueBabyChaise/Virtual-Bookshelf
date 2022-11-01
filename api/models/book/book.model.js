
const User = require('@models/user/user.model');
const mongoose = require('mongoose');
const Book = new mongoose.Schema({
    title: {type: String, required:true},
    officialTitle: {type: String, required:true},
    isbn: {type: String, required:true},
    status: {type: Number, required:true},
    fkUser: {type: mongoose.ObjectId, required:true},
    fkSerie: {type: mongoose.ObjectId}
});

const BookModel = mongoose.model('book', Book);

async function findOneBookByISBN({isbn, fkUser}) {
    const bookFound = await BookModel.find({ isbn, fkUser })
    if (bookFound.length)
        return bookFound[0];
    return undefined;
}

async function findAllBookOfUser({fkUser}) {
    const bookFound = await BookModel.find({ fkUser })
    if (bookFound)
        return bookFound;
    return undefined;
}

async function removeBookByISBN({isbn, fkUser}) {
    const bookFound = await BookModel.findOneAndDelete({ isbn, fkUser })
    if (bookFound)
        return bookFound;
    return undefined;
}

async function updateBookByISBN({isbn, fkUser, newParams}) {
    const bookFound = await BookModel.findOneAndUpdate({ isbn, fkUser }, newParams)
    if (bookFound)
        return bookFound;
    return undefined;
}


module.exports = {
    Book,
    findOneBookByISBN,
    removeBookByISBN,
    updateBookByISBN,

    async createBookEntry({title, isbn, status, fkUser}) {
        const bookFound = await findOneBookByISBN({isbn, fkUser});
        if (!bookFound) {
            const book = new BookModel({title, officialTitle: title, isbn, status, fkUser});
            book.save();
            return book;
        }
        return false;
    },

    async getUsersBooks({ userId }) {
        const bookFounds = await findAllBookOfUser({fkUser: userId});
        if (!bookFounds) {
            return false;
        }
        return bookFounds
    }
}
