const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/projectManagement',{useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err){
        console.log('MongoDB Connection Success...');
    }else{
        console.log('MongoDB Connection Error' + JSON.stringify(err, undefined, 2));
    }
});


module.exports = mongoose;