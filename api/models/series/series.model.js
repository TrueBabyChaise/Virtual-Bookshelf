const mongoose = require('mongoose');
const Series = new mongoose.Schema({
    title: {type: String, required:true},
    key: {type: String},
    fkUser: {type: mongoose.ObjectId, required:true},
    books: {type: [mongoose.ObjectId]}
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

        seriesFound.books.addToSet(book)
        seriesFound.save()
        return seriesFound
    },

    async addBooksInSeries({title, fkUser, books}) {
        const seriesFound = await  findOneSeries({title, fkUser});
        if (!seriesFound) return false;

        books.forEach(e => {
            seriesFound.books.addToSet(e._id)
        })
        seriesFound.save()
        return seriesFound
    }
}