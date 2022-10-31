const router = require("express").Router();
const auth = require('./auth');
const book = require('./book');

router.use('/auth', auth);
router.use('/book', book);

module.exports = router;
