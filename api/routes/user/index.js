const router = require('express').Router();
const { findOneBookByISBN, getUsersBooks }= require("@models/book/book.model");
const authToken = require("~/passport/authToken");
const book = require("./book");
const bookInfo = require("./bookInfo");

router.use('/book', book);
router.use('/bookInfo', bookInfo);

module.exports = router
