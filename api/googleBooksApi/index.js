const axios = require('axios');

/**
    * 
    * @param {String} ISBN 
    */
async function requestBookByISBN(isbn) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&projection=full`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                resolve(response.data.items[0]);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

/**
    * 
    * @param {String} work_link 
    */
async function requestBookByWork(work_link) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://openlibrary.org/${work_link}.json`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

/**
    * 
    * @param {String} author_link 
    */
async function requestBookByAuthor(author_link) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://openlibrary.org/${author_link}.json`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}

/**
    * 
    * @param {String} ISBN
    */
async function getBookInfo(ISBN) {
    const ISBNItemInfo = await requestBookByISBN(ISBN)
    const volumeInfo = ISBNItemInfo.volumeInfo

    console.log(volumeInfo)

    return {
        title: volumeInfo.title,
        isbn: ISBN,
        authors: volumeInfo.authors,
        categories: volumeInfo.categories,
        maturityRating: volumeInfo.maturityRating,
        numberOfPages: volumeInfo.pageCount,
        publisher: volumeInfo.publisher ? volumeInfo.publisher : "",
        publishedDate: volumeInfo.publishedDate ? volumeInfo.publishedDate : "",
        synopsis: volumeInfo.description ? volumeInfo.description : "",
        language: volumeInfo.language ? volumeInfo.language : "",
        smallThumbnail: volumeInfo.imageLinks.smallThumbnail,
        thumbnail: volumeInfo.imageLinks.thumbnail,
    }
}

/**
    * 
    * @param {String} query 
    * @param {Number} limit 
    */
async function searchBooks(query, limit) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://www.googleapis.com/books/v1/volumes?q=${query}`,
            headers: {}
        };

        axios(config)
            .then(function (response) {
                resolve(response.data);
            })
            .catch(function (error) {
                reject(error);
            });
    })
}


function foundISBN13(isbns) {
    for (let i = 0; i < isbns.length; i++) {
        if (isbns[i].type == "ISBN_13")
            return isbns[i].identifier
    }
    return isbns[isbns.length - 1].identifier;
}

async function processUserQuery(query, limit=30) {
    const response = await searchBooks(query, limit)
    const books = new Array()

    if (!response.items) return false

    for (let i = 0; i < response.items.length; i++) {
        const element = response.items[i]
        const book = element.volumeInfo
        if (book.industryIdentifiers) {
            const isbn = foundISBN13(book.industryIdentifiers)
            let image = "";
            if (book.imageLinks)
                image = book.imageLinks.smallThumbnail;
            books.push({title: book.title, isbn, image });
        }
        if (books.length >= 10)
            break;
    }

    return {
        books,
    }
}



module.exports = {
    getBookInfo,
    processUserQuery
}