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
async function requestUrl(link) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `${link}`,
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
 async function requestAmazonPage(ISBN_10) {
    return new Promise(function (resolve, reject) {
        var config = {
            method: 'get',
            url: `https://www.amazon.com/dp/${ISBN_10}`,
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

function foundISBN10(isbns) {
    for (let i = 0; i < isbns.length; i++) {
        if (isbns[i].type == "ISBN_10")
            return isbns[i].identifier
    }
    return isbns[isbns.length - 1].identifier;
}

/**
    * 
    * @param {String} ISBN
    */
async function getBookInfo(ISBN) {
    const ISBNItemInfo = await requestBookByISBN(ISBN)
    const volumeInfo = ISBNItemInfo.volumeInfo
    let bookCover = ""
    // GOOGLE IMAGE SEARCH "https://www.google.com/search?q=${ISBN}&source=lnms&tbm=isch&sa=X&ved=2ahUKEwie44_AnqLpAhUhBWMBHUFGD90Q_AUoAXoECBUQAw&biw=1920&bih=947"
    
    try {
        bookCover = `https://pictures.abebooks.com/isbn/${ISBN}.jpg`
        await requestUrl(bookCover)
    } catch (error) {
        try {
            bookCover = await requestAmazonPage(foundISBN10(ISBNItemInfo.volumeInfo.industryIdentifiers))
    
            bookCover = bookCover.substring(
                bookCover.indexOf('src="https://m.media-amazon.com/images/I/', bookCover.indexOf(`.jpg" onload="this.onload='';setCSMReq('af')`) - 200), 
                bookCover.indexOf(`.jpg" onload="this.onload='';setCSMReq('af')`) + 5
            )
            bookCover = bookCover.replace('src="', '').replace('"', '')
            bookCover = "https://m.media-amazon.com/images/I/" + bookCover.split('/I/')[1].split('.')[0] + ".jpg";
        } catch (error) {
            bookCover = `https://books.google.com/books/publisher/content/images/frontcover/${ISBNItemInfo.id}?fife=w500-h500`
        }
    }

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
        thumbnail: bookCover,
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