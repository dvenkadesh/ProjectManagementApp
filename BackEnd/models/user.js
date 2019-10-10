const mongoose = require('mongoose');


var User = mongoose.model('User',{
    First_Name: { type: String },
    Last_Name: { type: String },
    Employee_Id: { type: Number }
}); 

module.exports = { User };