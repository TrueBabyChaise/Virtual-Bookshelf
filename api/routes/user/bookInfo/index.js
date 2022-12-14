const router = require('express').Router();
const authToken = require("~/passport/authToken");
const { updateBookUserInfoByISBN, findOneBookUserInfoByISBN, removeBookUserInfoByISBN,
	updateBookUserInfoByBookId, findOneBookUserInfoByBookId, removeBookUserInfoByBookId,
	createBookUserInfoEntry, findAllBookUserInfoOfUser }
	= require("@models/book/bookUserInfo.model");

router.get('/:id', authToken, async (req, res) => {
	const userId = req.params.id;

	if (!userId)
		res.status(404).json({ message: "Not found" })
	else {
		res.status(200).json(await findAllBookUserInfoOfUser({ fkUser: userId }));
	}
});

router.get('/', authToken, async (req, res) => {
	const userId = req.user;

	if (!userId)
		res.status(403).json({ message: "Forbidden" })
	else {
		res.status(200).json(await findAllBookUserInfoOfUser({ fkUser: userId }));
	}
});


router.get('/isbn/:isbn', authToken, async (req, res) => {
	let params = req.params
	let isbn = params.isbn.replaceAll('-', '')
	const userId = req.user

	const bookUserInfo = await findOneBookUserInfoByISBN({ isbn, fkUser: userId });

	if (bookUserInfo) {
		res.status(200).json(bookUserInfo);
	} else
		res.status(422).json({ message: "Couldn't find book" });
});

router.post('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	if (!userId)
		res.status(403).json({ message: "Forbidden" })
	else {
		try {
			bookAdded = await createBookUserInfoEntry({ isbn, fkUser: userId })
			if (bookAdded)
				res.status(200).json({ bookAdded });
			else
				res.status(422).json({ message: "Book already added" })
		} catch (error) {
			res.status(422).json({ message: "Someting wrong happened" });
		}
	}
});

router.put('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user
	let newParams = req.body

	if (!userId)
		res.status(403).json({ message: "Forbidden" })
	else {
		try {
			const bookUpdated = await updateBookUserInfoByISBN({ isbn, fkUser: userId, newParams })
			if (bookUpdated)
				res.status(200).json({ bookUpdated });
			else
				res.status(422).json({ message: "Book not found" })
		} catch (error) {
			res.status(422).json({ message: "Someting wrong happened" });
		}
	}
});

router.delete('/isbn/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	if (!userId)
		res.status(403).json({ message: "Forbidden" })
	else {
		try {
			const bookDeleted = await removeBookUserInfoByISBN({ isbn, fkUser: userId })
			if (bookDeleted)
				res.status(200).json({ bookDeleted });
			else
				res.status(422).json({ message: "Book not found" })
		} catch (error) {
			res.status(422).json({ message: "Someting wrong happened" });
		}
	}
});



router.get('/:bookID', authToken, async (req, res) => {
	let params = req.params
	const bookId = params.bookID
	const userId = req.user

	const bookUserInfo = await findOneBookUserInfoByBookId({ fkBook: bookId, fkUser: userId });

	if (bookUserInfo)
		res.status(200).json(bookUserInfo);
	else
		res.status(422).json({ message: "Couldn't find book" });



});

router.put('/:bookID', authToken, async (req, res) => {
	const params = req.params
	const bookId = params.bookID
	const userId = req.user
	let newParams = req.body.book

	if (!userId)
		res.status(403).json({ message: "Forbidden" })
	else {
		try {
			const bookUpdated = await updateBookUserInfoByBookId({ fkBook: bookId, fkUser: userId, newParams })
			if (bookUpdated)
				res.status(200).json({ bookUpdated });
			else
				res.status(422).json({ message: "Book not found" })
		} catch (error) {
			res.status(422).json({ message: "Someting wrong happened" });
		}
	}
});

router.delete('/:bookID', authToken, async (req, res) => {
	const params = req.params
	const bookId = params.bookID
	const userId = req.user

	if (!userId)
		res.status(403).json({ message: "Forbidden" })
	else {
		try {
			const bookDeleted = await removeBookUserInfoByBookId({ fkBook: bookId, fkUser: userId })
			if (bookDeleted)
				res.status(200).json({ bookDeleted });
			else
				res.status(422).json({ message: "Book not found" })
		} catch (error) {
			res.status(422).json({ message: "Someting wrong happened" });
		}
	}
});

module.exports = router
