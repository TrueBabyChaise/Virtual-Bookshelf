const mongoose = require('mongoose');
const { Book } = require('../book/book.model')

const Series = new mongoose.Schema({
    username: {type: String, required:true},
    fkUser: {type: Number, required:true},
    books: {type: [Book]}
});

const SeriesModel = mongoose.model('series', Series);

module.exports = {

    async addBookInSeries() {
        
    }
    
}