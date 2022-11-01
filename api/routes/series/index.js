const router = require('express').Router();
const axios = require('axios');
const authToken = require("../../passport/authToken");
const { createSeries, findAllSeriesOfUser, addBookInSeries, addBooksInSeries, findOneSeries, removeSeriesByTitle, updateSeriesByTitle} = require("@models/series/series.model");
const { findOneBookByISBN } = require("@models/book/book.model");


router.get('/:title', authToken, async (req, res) => {
	const params = req.params
	const title = params.title
	const userId = req.user

	if (!userId) {
		res.status(403).json({message: "Forbidden"})
		return
	}
	const seriesFound = await findOneSeries({title, fkUser: userId})
	if (seriesFound) 
		res.status(200).json({seriesFound})
	else
		res.status(422).json({message: "Series not found"});
});

router.get('/', authToken, async (req, res) => {
	const userId = req.user

	if (!userId) {
		res.status(403).json({message: "Forbidden"})
		return
	}
	const seriesFound = await findAllSeriesOfUser({fkUser: userId})
	if (seriesFound) 
		res.status(200).json({seriesFound})
	else
		res.status(422).json({message: "No series founds"});
});

router.post('/:title', authToken, async (req, res) => {
	const params = req.params
	const title = params.title
	const userId = req.user

	if (!userId) {
		res.status(403).json({message: "Forbidden"})
		return
	}
	const seriesCreated = await createSeries({title, fkUser: userId})
	if (seriesCreated) 
		res.status(200).json({seriesCreated})
	else
		res.status(422).json({message: "Series already exists"});
})

router.post('/:title/book/:isbn', authToken, async (req, res) => {
	const params = req.params
	const title = params.title
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	if (!userId) {
		res.status(403).json({message: "Forbidden"})
		return
	}

	const seriesFound = await findOneSeries({title, fkUser: userId})
	if (!seriesFound) {
		res.status(422).json({message: "Series not found"});
		return
	}

	console.log({isbn, fkUser: userId})

	const bookFound = await findOneBookByISBN({isbn, fkUser: userId})
	if (!bookFound) {
		res.status(422).json({message: "Book not found"});
		return
	}

	const bookAdded = await addBookInSeries({title, fkUser: userId, book: bookFound._id})

	if (bookAdded)
		res.status(200).json({bookAdded});
	else
		res.status(422).json({message: "Book already added"})
});

router.post('/:title/books', authToken, async (req, res) => {
	const params = req.params
	const title = params.title
	const books = req.body.books
	const userId = req.user

	if (!userId) {
		res.status(403).json({message: "Forbidden"})
		return
	}

	const seriesFound = await findOneSeries({title, fkUser: userId})
	if (!seriesFound) {
		res.status(422).json({message: "Series not found"});
		return
	}

	const booksAdded = await addBooksInSeries({title, fkUser: userId, books})
	if (booksAdded)
		res.status(200).json({booksAdded});
	else
		res.status(422).json({message: "Book already added"})
});

router.put('/:title', authToken, async (req, res) => {
	const params = req.params
	const title = params.title
	const userId = req.user
	let newParams = req.body.series

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const bookUpdated = await updateSeriesByTitle({title, fkUser: userId, newParams})
			if (bookUpdated)
				res.status(200).json({bookUpdated});
			else
				res.status(422).json({message: "Book already added"})
		} catch (error) {
			res.status(422).json({message: "Wrong title"});
		}
	}
});

router.delete('/:title', authToken, async (req, res) => {
	const params = req.params
	const title = params.title
	const userId = req.user

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const seriesDeleted = await removeSeriesByTitle({title, fkUser: userId})
			if (seriesDeleted)
				res.status(200).json({seriesDeleted});
			else
				res.status(422).json({message: "Book already added"})
		} catch (error) {
			res.status(422).json({message: "Wrong title"});
		}
	}
});

module.exports = router
