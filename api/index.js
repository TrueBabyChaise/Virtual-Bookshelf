require('dotenv').config()
const moduleAlias = require('module-alias/register')
const express = require('express');
const http = require('http');
const db = require('./database/database.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const strategy = require('./passport/auth');
const routes = require('./routes');
const app = express();

app.use(
        cors({origin: 'http://164.92.237.184:3000', credentials: true})
);

/*app.use(
        cors({origin: '*'})
);*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser("emikungif"));
app.use(passport.initialize());

passport.use(strategy);

app.use("/api", routes);

app.get('/api', (req, res) => {
    res.status(200).json({message : 'API is on'});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("app listening on port", port);
});
