const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

const port = process.env.SERVERPORT || 5000;
const dbUri = process.env.ATLAS_URI;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
app.use(bodyParser.json(), urlencodedParser)
app.use(express.json());
app.use(cors());

mongoose.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(res => {
        app.listen(port, () => {
            console.log(`App is running on the Port ${port}`);
        })
    })
    .catch(err => { console.log(err) })
