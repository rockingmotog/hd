const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });


const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
//app.use(require('./routes/record'));

const dbo = require('./db/conn.js');

app.listen(port, () => {
    dbo.connectToServer()
    console.log(`App is running on the Port ${port}`);
})



