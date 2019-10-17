const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Task} = require('../models/Task');

router.post('/add', (req, res) => {
    let taskData = req.body;
    let task = new Task(taskData);
    task.save((err, taskData) => {
        if(!err){
            res.send(taskData);
        }
    })
    
});

router.get('/', (req, res) => {
    var queryVar = req.query;
    
    if(queryVar.sortKey){

        Task.find().sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else if(queryVar.Project){
        
        Task.find({Project : queryVar.Project}, (err, doc) => {
            if(!err){
                
                res.send(doc);
            }else{
                console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }else{
        var query = Task.find();
        query.populate('parent');
        
        query.exec(function(err, docs) {
            if(!err){
                
                    res.send(docs);
            }else{
                console.log('Error in Retriving Task: ' + JSON.stringify(err, undefined, 2));
            }
        });
         

    }
    
});

module.exports = router;