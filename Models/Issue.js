const mongoose = require('mongoose');

//  creating the Issue schema 
const issueSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    label:[String],
    description:{
        type:String,
        required:true
    },
},
{
    timestamps:true
})

// setting up Issue Schema
const Issue = mongoose.model('Issue',issueSchema);

// exporting the schema
module.exports = Issue;