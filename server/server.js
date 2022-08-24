const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const mongoose = require('mongoose');
const awsses = require('./emailer')


require('dotenv').config({ path: './config.env' });
const port = process.env.SERVERPORT || 5000;
const dbUri = process.env.ATLAS_URI;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
app.use(bodyParser.json(), urlencodedParser)
app.use(express.json());
app.use(cors());

// connect to the database and server starts listening

mongoose.connect(dbUri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(res => {
        app.listen(port, () => {
            console.log(`App is running on the Port ${port}`);
        })
    })
    .catch(err => { console.log(err) })



app.get('/', async (req, res) => {

    res.send('Welcome to Home Page !!!')
    console.log('GET Method Invoked')

})


app.post('/register', async (req, res) => {

    const userdetails = req.body;
    console.log(userdetails.username, userdetails.emailid, userdetails.password)

    // Verify if the username and emailid already used for registeration
    const userProvidedName = await User.findOne({ username: userdetails.username })
    const userProvidedEmail = await User.findOne({ emailid: userdetails.emailid })


    if (userProvidedName || userProvidedEmail) {
        res.json({ message: "UserName or Email Id aleady used by some one else" })
    } else {
        userdetails.password = await bcrypt.hash(req.body.password, 10)
        const dbUser = new User({ username: userdetails.username.toLowerCase(), emailid: userdetails.emailid.toLowerCase(), password: userdetails.password })
        dbUser.save()

        // Verify if the username and emailid already used for registeration

        global.fdCode = Math.floor(1000 + Math.random() * 9000);
        awsses.email('no-reply@haradata.org', userProvidedEmail, fdCode)
        res.json({ message: "success" })

    }
})


app.verify('/verify', async (req, res) => {

    const udCode = req.code;
    if (udCode == fdCode) {
        console.log('Your email-id has been succefully validated !!! ')
        res.json({ message: 'success' })
    }
})

app.post('/login', async (req, res) => {
    const userLoginDetails = req.body;
    console.log(userLoginDetails.username, userLoginDetails.emaillid, userLoginDetails.password)
    User.findOne({ username: userLoginDetails.username })
        .then(dbUser => {
            if (!dbUser) { return res.json({ message: "Invalid Username & Password" }) }
            bcrypt.compare(userLoginDetails.password, dbUser.password)
                .then(isCorrect => {
                    if (isCorrect) {
                        const payload = {
                            id: dbUser._id,
                            username: dbUser.username
                        }
                        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 },
                            (err, token) => {
                                if (err) return res.json({ message: err })
                                return res.json({
                                    message: "Success",
                                    token: "Bearer" + token
                                })

                            })

                    } else {
                        return res.json({
                            message: "Invalid Username or Password"
                        })
                    }


                })
        })
})
