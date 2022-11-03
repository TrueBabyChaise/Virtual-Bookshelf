
const User = require('@models/user/user.model');
const mongoose = require('mongoose');
const { getBookInfo } = require('@openlibrary');

const Book = new mongoose.Schema({
    title: {type: String, required: true},
    isbn: {type: String, required: true},
    author: {type: String, required: true},
    contributors: {type: Map, of: String, required: true},
    numberOfPages: {type: Number, required: true},
    publisher: {type: String, required: true},
    synopsis: {type: String, required: true},
    language: {type: String, required: true},
    imageS: {type: String, required:true},
    imageM: {type: String, required:true},
    imageL: {type: String, required:true},
    bookUserInfos: [{type: mongoose.ObjectId, ref: 'bookUserInfo'}]
});

Book.pre('findOneAndDelete', function(next) {
    console.log("HERE")
    this.model('bookUserInfo').deleteMany({ fkBook: this._id }, function (err, result) {
        if (err) {
          console.log(`[error] ${err}`);
          next(err);
        } else {
          console.log('success');
          next();
        }
    })
});

const BookModel = mongoose.model('book', Book);

async function findOneBookByISBN({isbn}) {
    const bookFound = await BookModel.find({ isbn })
    if (bookFound.length)
        return bookFound[0];
    return undefined;
}

async function updateBookByISBN({isbn, newParams}) {
    const bookFound = await BookModel.findOneAndUpdate({ isbn }, newParams)
    if (bookFound)
        return bookFound;
    return undefined;
}

async function removeBookByISBN({isbn}) {
    console.log("TU DELETES UN TRUC NON ?")
    const bookFound = await BookModel.findOneAndDelete({ isbn })
    if (bookFound)
        return bookFound;
    return undefined;
}


module.exports = {
    findOneBookByISBN,
    updateBookByISBN,
    removeBookByISBN,

    async createBookEntry({isbn}) {
        const bookFound = await findOneBookByISBN({isbn});
        if (!bookFound) {
            let bookData = await getBookInfo(isbn)
            const book = new BookModel(bookData);
            book.save();
            return book;
        }
        return false;
    },
}
