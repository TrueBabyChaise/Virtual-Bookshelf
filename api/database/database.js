require('dotenv').config()
const mongoose = require('mongoose');
console.log({ dbName: process.env.MONGO_DB, user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD})
con = mongoose.connect(`mongodb://database:27017/`, { dbName: process.env.MONGO_DB, user: process.env.MONGO_USER, pass: process.env.MONGO_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongoose Connected'))
.catch(e => console.log(e));
module.exports = con;
