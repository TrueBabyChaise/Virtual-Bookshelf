const axios = require('axios');

/**
    * 
    * @param {String} ISBN 
    */
async function requestBookByISBN(isbn) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://openlibrary.org/isbn/${isbn}.json`,
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
    const bookInfoISBN = await requestBookByISBN(ISBN)
    console.log(bookInfoISBN)
    const bookInfoWork = await requestBookByWork(bookInfoISBN.works[0].key)
    console.log(bookInfoWork)
    const bookInfoAuthor = await requestBookByAuthor(bookInfoWork.authors[0].author.key)
    console.log(bookInfoAuthor)


    let contributors = new Object()
    if (bookInfoISBN.contributors)
        bookInfoISBN.contributors.forEach(e => {
            contributors[`${e.role}`] = e.name;
        })

    return {
        title: bookInfoISBN.title,
        isbn: ISBN,
        author: bookInfoAuthor.name,
        contributors,
        numberOfPages: bookInfoISBN.number_of_pages,
        publisher: bookInfoISBN.publishers ? bookInfoISBN.publishers[0] : "",
        synopsis: bookInfoWork.description ? bookInfoWork.description.value : "",
        language: bookInfoISBN.languages ? bookInfoISBN.languages[0].key.replace('/languages/', '') : "",
        imageS: `https://covers.openlibrary.org/b/isbn/${ISBN}-S.jpg?default=false`,
        imageM: `https://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg?default=false`,
        imageL: `https://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg?default=false`,
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
        query: `https://www.googleapis.com/books/v1/volumes?q=${query}`
    }
}



module.exports = {
    getBookInfo,
    processUserQuery
}