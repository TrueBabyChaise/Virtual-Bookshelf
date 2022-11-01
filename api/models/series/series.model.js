const mongoose = require('mongoose');
const { Book } = require('../book/book.model')

const Series = new mongoose.Schema({
    title: {type: String, required:true},
    fkUser: {type: mongoose.ObjectId, required:true},
    books: {type: [Book]}
});

const SeriesModel = mongoose.model('series', Series);

async function findOneSeries({title, fkUser}) {
    const seriesFound = await SeriesModel.findOne({ title, fkUser })
    if (seriesFound)
        return seriesFound;
    return undefined;
}

async function findAllSeriesOfUser({fkUser}) {
    const seriesFounds = await SeriesModel.find({ fkUser })
    if (seriesFounds.length)
        return seriesFounds;
    return undefined;
}

async function removeSeriesByTitle({title, fkUser}) {
    const seriesFound = await SeriesModel.findOneAndDelete({ title, fkUser })
    if (seriesFound)
        return seriesFound;
    return undefined;
}

async function updateSeriesByTitle({title, fkUser, newParams}) {
    const seriesFound = await SeriesModel.findOneAndUpdate({ title, fkUser }, newParams)
    if (seriesFound)
        return seriesFound;
    return undefined;
}


module.exports = {
    updateSeriesByTitle,
    removeSeriesByTitle,
    findAllSeriesOfUser,
    findOneSeries,

    async createSeries({title, fkUser}) {
        const seriesFound = await  findOneSeries({title, fkUser});
        if (!seriesFound) {
            const series = new SeriesModel({title, fkUser});
            series.save();
            return series;
        }
        return false;
    },

    async addBookInSeries({title, fkUser, book}) {
        const seriesFound = await  findOneSeries({title, fkUser});
        if (!seriesFound) return false;

        console.log("Before", seriesFound.books)
        console.log("addToSet", seriesFound.books.addToSet(book))
        console.log("After", seriesFound.books)
        seriesFound.save()
        return seriesFound
    },

    async addBooksInSeries({title, fkUser, books}) {
        const seriesFound = await  findOneSeries({title, fkUser});
        if (!seriesFound) return false;

        console.log("Before",seriesFound.books)
        seriesFound.books = seriesFound.books.concat(books)
        console.log("After", seriesFound.books)
        seriesFound.save()
        return seriesFound
    }
}