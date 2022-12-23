const router = require('express').Router();
const axios = require('axios');
const authToken = require("~/passport/authToken");
const { findOneBook } = require("@models/book/book.model");
const {  updateBookUserInfoByISBN, findOneBookUserInfoByISBN, removeBookUserInfoByISBN,
	updateBookUserInfoByBookId, findOneBookUserInfoByBookId, removeBookUserInfoByBookId,
	createBookUserInfoEntry, findAllBookUserInfoOfUser } 
	= require("@models/book/bookUserInfo.model");


router.get('/', authToken, async (req, res) => {
	const userId = req.user
	if (!userId)
		res.status(404).json({ message: "Not found" })
	else {
		const booksInfo = await findAllBookUserInfoOfUser({ fkUser: userId })
		const books = []
		for (let i = 0; i < booksInfo.length; i++) {
			const book = await findOneBook({_id: booksInfo[i].fkBook})
			console.log(book.title, booksInfo[i].fkBook, i)
			books.push(book)
		}
		res.status(200).json(books);
	}
});


router.get('/:bookID', authToken, async (req, res) => {
	let params = req.params
	const bookId = params.bookID
	const userId = req.user
	let bookUserInfo = null
	console.log(bookId, userId)

	try {
		bookUserInfo = await findOneBookUserInfoByBookId({fkBook: bookId, fkUser: userId});
	} catch (error) {
		console.log(error)
		res.status(422).json({message: "Couldn't find book"});
		return
	}


	if (bookUserInfo) { 
		const book = await findOneBook({_id: bookUserInfo.fkBook})
		res.status(200).json(book);
	} else
		res.status(422).json({message: "Couldn't find book"});
});

router.get('/isbn/:isbn', authToken, async (req, res) => {
	let params = req.params
	let isbn = params.isbn.replaceAll('-', '')
	const userId = req.user

	const bookUserInfo = await findOneBookUserInfoByISBN({isbn, fkUser: userId});

	if (bookUserInfo) {
		const book = await findOneBook({_id: bookUserInfo.fkBook})
		res.status(200).json(book);
	} else
		res.status(422).json({message: "Couldn't find book"});
});

router.post('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	console.log(isbn, userId)

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			bookAdded = await createBookUserInfoEntry({isbn, fkUser: userId})
			const book = await findOneBook({id: bookAdded.fkBook})
			if (bookAdded)
				res.status(200).json({book});
			else
				res.status(422).json({message: "Book already added"})
		} catch (error) {
			res.status(422).json({message: "Someting wrong happened"});
		}
	}
});

router.delete('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const bookDeleted = await removeBookUserInfoByISBN({isbn, fkUser: userId})
			if (bookDeleted)
				res.status(200).json({bookDeleted});
			else
				res.status(422).json({message: "Book not found"})
		} catch (error) {
			res.status(422).json({message: "Someting wrong happened"});
		}
	}
});


router.delete('/:bookID', authToken, async (req, res) => {
	const params = req.params
	const bookId = params.bookID
	const userId = req.user

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const bookDeleted = await removeBookUserInfoByBookId({fkBook: bookId, fkUser: userId})
			if (bookDeleted)
				res.status(200).json({bookDeleted});
			else
				res.status(422).json({message: "Book not found"})
		} catch (error) {
			res.status(422).json({message: "Someting wrong happened"});
		}
	}
});

module.exports = router
 