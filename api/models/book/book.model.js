
const mongoose = require('mongoose');
const { getBookInfo } = require('~/googleBooksApi');

const Book = new mongoose.Schema({
    title: {type: String, required: true},
    isbn: {type: String, required: true, unique: true},
    authors: {type: Array, default: []},
    categories: {type: Array, default: []},
    maturityRating: {type: String,  default: ""},
    numberOfPages: {type: Number, default: 0},
    publisher: {type: String,  default: ""},
    publishedDate: {type: String,  default: ""},
    synopsis: {type: String,  default: ""},
    language: {type: String,  default: ""},
    smallThumbnail: {type: String, required:true},
    thumbnail: {type: String, required:true},
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
    const bookDeleted = await BookModel.findOneAndDelete({ isbn })
    if (!bookDeleted)
        return undefined;
    await mongoose.model('bookUserInfo').deleteMany({fkBook: bookDeleted._id})
    return bookDeleted;
}

async function findOneBook({ _id }) {
    const bookFound = await BookModel.find({ _id })
    if (bookFound.length)
        return bookFound[0];
    return undefined;
}

async function updateBook({id, newParams}) {
    const bookFound = await BookModel.findOneAndUpdate({ id }, newParams)
    if (bookFound)
        return bookFound;
    return undefined;
}

async function removeBook({id}) {
    const bookDeleted = await BookModel.findOneAndDelete({ id })
    if (!bookDeleted)
        return undefined;
    await mongoose.model('bookUserInfo').deleteMany({fkBook: bookDeleted._id})
    return bookDeleted;
}

module.exports = {
    findOneBookByISBN,
    updateBookByISBN,
    removeBookByISBN,
    findOneBook,
    updateBook,
    removeBook,

    async createBookEntry({isbn}) {
        const bookFound = await findOneBookByISBN({isbn});
        if (!bookFound) {
            let bookData = await getBookInfo(isbn)
            if (!bookData)
                return false;
            if (bookData.isbn) {
                const book = new BookModel(bookData);
                await book.save();
                return book;
            }
        }
        return false;
    },
}
