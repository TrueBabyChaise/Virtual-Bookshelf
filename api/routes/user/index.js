const router = require('express').Router();
const { findOneBookByISBN, getUsersBooks }= require("@models/book/book.model");
const authToken = require("~/passport/authToken");
const book = require("./book");

router.use('/book', book);

router.get('/book/:isbn', authToken, async (req, res) => {
	const userId = req.user;

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")


	res.status(200).json(await findOneBookByISBN({isbn, fkUser: userId}));
	
});

router.get('/books/', authToken, async (req, res) => {
	const userId = req.user;

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else
		res.status(200).json({message: "Not implemented"});
});

module.exports = router
