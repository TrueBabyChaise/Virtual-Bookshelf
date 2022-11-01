const mongoose = require('mongoose');
const con = mongoose.connect('mongodb://localhost:27017/Virtual-Bookshelf', { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongoose Connected'))
.catch(e => console.log(e));
module.exports = con;
