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


app.post('/register', async (req, res) => {
    const user = req.body;

    const givenUsername = await User.findOne({ username: user.username })
    const takenEmail = await User.findOne({ email: user.email })

    if (givenUsername || takenEmail) {
        console.log('Username or Email alredy taken by someone else')
    } else {
        user.password = await bcrypt.hash(req.body.password, 10);
        const dbUser = new User({
            username: user.username.toLowerCase(),
            email: user.email.toLowerCase(),
            password: user.password
        })
        dbUser.save();
        res.json({ message: "Success !! " })
    }

})

app.post('/login', async (req, res) => {
    const userLogin = req.body;
    User.findOne({ username: userLogin.username })
        .then(dbUser => {
            if (!dbUser) {
                return res.json({
                    message: "Invaild Username & Password"
                })
            }
            bcrypt.compare(userLogin.password, dbUser.password)
            .then(isCorrect){ 
                const payload = 
            }
        })

}
)
