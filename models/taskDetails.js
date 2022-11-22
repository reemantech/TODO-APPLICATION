const mongoose= require('mongoose');

// creating the task schema
const taskSchema = new mongoose.Schema({
    TaskName:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    category_type:{
        type:String,
        required: true
    },
    marked:{
        type:Boolean,
        required: false
    },
    color:{
        type:String
    }
});

const TaskDetails = mongoose.model('Task', taskSchema); 
//  adding our schema in the exports 
module.exports = TaskDetails;


