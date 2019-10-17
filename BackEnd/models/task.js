const mongoose = require('mongoose');
const keyInc = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

var taskSchema = new mongoose.Schema({
    Task_Id: {type : Number},
    Task_Name: {type : String},
    Start_Date: {type : Date},
    End_Date: {type : Date},
    Priority: {type : Number},
    Status: {type : Number, default: 0}
});

taskSchema.plugin(keyInc, {inc_field: 'Task_Id'});

var Task = mongoose.model('Task', taskSchema);
module.exports = {Task};