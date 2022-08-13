const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config({'./config.env'}); 


const port = process.env.PORT || 5000; 
const app = express(); 
app.use(express.json()); 
app.use(cors()); 
app.use(require('./routes/record')); 



