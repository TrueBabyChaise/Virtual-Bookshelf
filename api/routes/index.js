const router = require("express").Router();
const auth = require('./auth');
const book = require('./book');
const user = require('./user');

router.use('/auth', auth);
router.use('/book', book);
router.use('/user', user);

module.exports = router;
