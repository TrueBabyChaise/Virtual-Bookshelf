const router = require('express').Router();
const axios = require('axios');

/**
 * 
 * @param {Array<>} reactions 
 */
async function getBookByISBN(isbn) {
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

router.get('/isbn/:id', async (req, res) => {
	let params = req.params
	let isbn_id = params.id

	console.log(isbn_id)

	res.status(200).json(await getBookByISBN(isbn_id));
	
});

module.exports = router
