const mongoose = require('mongoose');

//  creating the project schema 
const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    issues:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Issue'
    }]
},
{
    timestamps:true
})

// setting up Project Schema
const Project = mongoose.model('Project',projectSchema);

// exporting the schema
module.exports = Project;