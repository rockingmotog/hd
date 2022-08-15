const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/user.js');
const { MongoTopologyClosedError } = require('mongodb');
const { default: mongoose } = require('mongoose');

require('dotenv').config({ path: './config.env' });


const port = process.env.SERVERPORT || 5000;
const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodedParser)
app.use(express.json());
app.use(cors());
app.use(require('./routes/records.js'));

mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useUnifiedTopolog: true })
    .then((res) => {

        app.listen(port, () => { console.log(`App is running on the Port ${port}`) })
    })
    .catch(err => console.log(err))




