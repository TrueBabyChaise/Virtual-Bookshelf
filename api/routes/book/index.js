const router = require('express').Router();
const axios = require('axios');
const authToken = require("~/passport/authToken");
const { createBookEntry, removeBookByISBN, updateBookByISBN, findOneBookByISBN} = require("@models/book/book.model");

/**
 * 
 * @param {String} ISBN 
 */
async function requestBookByISBN(isbn) {
	return new Promise(function (resolve, reject) {
		var config = {
			method: 'get',
			url:  `https://openlibrary.org/isbn/${isbn}.json`,
			headers: { }
		  };
		  
		  axios(config)
		  .then(function (response) {
			response.data.imageS = `https://covers.openlibrary.org/b/isbn/${isbn}-S.jpg`
			response.data.imageM = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
			response.data.imageL = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
			resolve(response.data);
		  })
		  .catch(function (error) {
			reject(error);
		  });
	})
}

router.get('/isbn/:isbn', async (req, res) => {
	let params = req.params
	let isbn = params.isbn

	res.status(200).json(await requestBookByISBN(isbn));
	
});

router.post('/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const bookInfo = await requestBookByISBN(isbn)
			const title = bookInfo.title
			const bookAdded = await createBookEntry({title, isbn, status: 0, fkUser: userId})
			if (bookAdded)
				res.status(200).json({bookAdded});
			else
				res.status(422).json({message: "Book already added"})
		} catch (error) {
			res.status(422).json({message: "Wrong ISBN"});
		}
	}
});

router.put('/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user
	let newParams = req.body.book

	try {
		if (!newParams || !newParams.title) {
			const book = await findOneBookByISBN({isbn, fkUser: userId})
			newParams = { title: book.officialTitle } 
		}
	} catch (error) {
		res.status(422).json({message: "Wrong ISBN"});
		return
	}
	

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const bookUpdated = await updateBookByISBN({isbn, fkUser: userId, newParams})
			if (bookUpdated)
				res.status(200).json({bookUpdated});
			else
				res.status(422).json({message: "Book already added"})
		} catch (error) {
			res.status(422).json({message: "Wrong ISBN"});
		}
	}
});

router.delete('/:isbn', authToken, async (req, res) => {
	const params = req.params
	const isbn = params.isbn.replaceAll("-", "")
	const userId = req.user

	if (!userId)
		res.status(403).json({message: "Forbidden"})
	else {
		try {
			const bookDeleted = await removeBookByISBN({isbn, fkUser: userId})
			if (bookDeleted)
				res.status(200).json({bookDeleted});
			else
				res.status(422).json({message: "Book already added"})
		} catch (error) {
			res.status(422).json({message: "Wrong ISBN"});
		}
	}
});

module.exports = router
