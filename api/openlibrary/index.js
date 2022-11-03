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
    const bookInfoWork = await requestBookByWork(bookInfoISBN.works[0].key)
    const bookInfoAuthor = await requestBookByAuthor(bookInfoWork.authors[0].author.key)


    let contributors = new Object()
    bookInfoISBN.contributors.forEach(e => {
        contributors[`${e.role}`] = e.name;
    })

    return {
        title: bookInfoISBN.title,
        isbn: ISBN,
        author: bookInfoAuthor.name,
        contributors,
        numberOfPages: bookInfoISBN.number_of_pages,
        publisher: bookInfoISBN.publishers[0],
        synopsis: bookInfoWork.description.value,
        language: bookInfoISBN.languages[0].key.replace('/languages/', ''),
        imageS: `https://covers.openlibrary.org/b/isbn/${ISBN}-S.jpg`,
        imageM: `https://covers.openlibrary.org/b/isbn/${ISBN}-M.jpg`,
        imageL: `https://covers.openlibrary.org/b/isbn/${ISBN}-L.jpg`,
    }
}


module.exports = {
    getBookInfo
}