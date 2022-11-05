const router = require('express').Router();
const axios = require('axios');
const authToken = require("~/passport/authToken");
const { createBookEntry, removeBookByISBN, updateBookByISBN, findOneBookByISBN,
		removeBook, updateBook, findOneBook
} = require("@models/book/book.model");

router.get('/isbn/:isbn', async (req, res) => {
	let params = req.params
	let isbn = params.isbn.replaceAll("-", "")

	try {
		const bookFound = await findOneBookByISBN({isbn})
		if (bookFound)
			res.status(200).json(bookFound);
		else
			res.status(422).json({message: "Book not found"})
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
	}
});

router.post('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	
	try {
		const bookAdded = await createBookEntry({isbn})
		if (bookAdded)
			res.status(200).json(bookAdded);
		else
			res.status(422).json({message: "Book already added"})
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
	}
});

router.put('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	let newParams = req.body.book

	if (!newParams || !newParams.title) {
		res.status(422).json({message: "Wrong Body Parameters"});
		return
	}	

	try {
		const bookUpdated = await updateBookByISBN({isbn, newParams})
		if (bookUpdated)
			res.status(200).json(bookUpdated);
		else
			res.status(422).json({message: "Book not found"})
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
	}
});

router.delete('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const bookDeleted = await removeBookByISBN({isbn})
	try {
		if (bookDeleted)
			res.status(200).json(bookDeleted);
		else
			res.status(422).json({message: "Book not found"})
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
	}
});


router.get('/:id', async (req, res) => {
	let params = req.params
	let id = params.id

	try {
		const bookFound = await findOneBook({id})
		if (bookFound)
			res.status(200).json(bookFound);
		else
			res.status(422).json({message: "Book not found"})
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
	}
});

router.put('/:id', authToken, async (req, res) => {
	const params = req.params
	const id = params.id
	let newParams = req.body.book

	try {
		const bookUpdated = await updateBook({id, newParams})
		if (bookUpdated)
			res.status(200).json(bookUpdated);
		else
			res.status(422).json({message: "Book not found"})
	} catch (error) {
		res.status(422).json({message: "Something wrong happened"});
	}
});

router.delete('/:id', authToken, async (req, res) => {
	const params = req.params
	const id = params.id
	const bookDeleted = await removeBook({id})
	try {
		if (bookDeleted)
			res.status(200).json(bookDeleted);
		else
			res.status(422).json({message: "Book not found"})
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
	}
});

module.exports = router
