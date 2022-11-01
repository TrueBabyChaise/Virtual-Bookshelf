const router = require("express").Router();
const auth = require('./auth');
const book = require('./book');
const user = require('./user');
const series = require('./series');

router.use('/auth', auth);
router.use('/book', book);
router.use('/series', series);
router.use('/user', user);

module.exports = router;
