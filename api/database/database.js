require('dotenv').config()
const mongoose = require('mongoose');
con = mongoose.connect(`mongodb://localhost:27017/`, { dbName: process.env.MONGO_DB, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Mongoose Connected'))
.catch(e => console.log(e));
module.exports = con;
