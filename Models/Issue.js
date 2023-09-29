const mongoose = require('mongoose');

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

const Issue = mongoose.model('Issue',issueSchema);
module.exports = Issue;