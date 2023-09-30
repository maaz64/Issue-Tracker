// importing the required files and modules
const express = require('express');
const app = express();
const db = require('./config/mongodb');
const router = require('./route')
const expressLayouts = require('express-ejs-layouts');
const PORT = 8000;

// setting static file path
app.use(express.static('./assets'));

// setting up ejs layout
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// using this middleware to decode forms data if its urlencoded
app.use(express.urlencoded({extended:true}));

// using this middleware to decode forms data if the data is in json format
app.use(express.json());

// creating general routes
app.use('/', router)

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// listening server
app.listen(PORT, ()=>{console.log(`Server is up and running on port ${PORT}`) })