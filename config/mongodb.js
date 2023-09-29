const mongoose = require('mongoose');
require('dotenv').config()
const url = process.env.Mongo_Url;

mongoose.connect(url).then(()=>{
    console.log('Database Connected Successfully')
}).catch((err)=>{
    console.log("Something went wrong while connecting to database", err);
});
