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
        imageS: `https://covers.openlibrary.org/b/isbn/${ISBN}-S.jpg`,
        imageM: `https://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg`,
        imageL: `https://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`,
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
            url: `https://openlibrary.org/search.json?q=${query}&limit=${limit}`,
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
        if (isbns[i].length == 13)
            return isbns[i]
    }
    return isbns[isbns.length - 1];
}

async function processUserQuery(query, limit=10) {
    const response = await searchBooks(query, limit)
    const books = new Array()

    if (!response.docs) return false

    for (let i = 0; i < response.docs.length; i++) {
        const element = response.docs[i]
        books.push({title: element.title, isbn: foundISBN13(element.isbn)});
    }

    return {
        books
    }
}



module.exports = {
    getBookInfo,
    processUserQuery
}