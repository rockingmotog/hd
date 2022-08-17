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

// Validate the if the user details already exists & Register the user 



app.get('/', async (req, res) => {

    res.send('Welcome to Home Page !!!')
    console.log('GET Method Invoked')

})

app.post('/register', async (req, res) => {
    
    const body = req.body;
    console.log(body.username, body.password)

    const userProvidedName = await User.findOne({ username: body.username })
    const userProvidedEmail = await User.findOne({ email: body.emailid })
    

})
