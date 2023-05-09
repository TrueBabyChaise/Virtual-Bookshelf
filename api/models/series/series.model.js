const mongoose = require('mongoose');
const Series = new mongoose.Schema({
    title: {type: String, required:true},
    key: {type: [String], default: []},
    fkUser: {type: mongoose.ObjectId, required:true},
    books: {type: [mongoose.ObjectId], default: []}
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

async function generateKeyBasedOnBooks(series) {

    for (const id of series.books) {
        series.key.addToSet((await mongoose.model('book').findById(id)).isbn.slice(0, 8))
    }
    series.save()
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

    async addBookInSeries({title, fkUser, bookId}) {
        const seriesFound = await  findOneSeries({title, fkUser});
        if (!seriesFound) return false;
        seriesFound.books.addToSet(bookId)
        if (!seriesFound.key.length)
            generateKeyBasedOnBooks(seriesFound)
        else
            seriesFound.save()
        return seriesFound
    },

    async addBooksInSeries({title, fkUser, books}) {
        const seriesFound = await  findOneSeries({title, fkUser});
        if (!seriesFound) return false;

        books.forEach(e => {
            seriesFound.books.addToSet(e)
        })

        if (!seriesFound.key)
            generateKeyBasedOnBooks(seriesFound)
        seriesFound.save()
        return seriesFound
    }
}