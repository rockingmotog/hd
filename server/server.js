const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./model/users')

require('dotenv').config({ path: './config.env' });


const port = process.env.SERVERPORT || 5000;
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false})
app.use(bodyParser.json(), urlencodedParser)
app.use(express.json());
app.use(cors());
app.use(require('./routes/records.js'));

const dbo = require('./db/conn.js');

app.listen(port, () => {
    dbo.connectToServer(function (err) { if (err) console.error(err); })
    console.log(`App is running on the Port ${port}`);
})



