const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Project} = require('../models/Project');

router.post('/add', (req, res) => {
    let projectData = req.body;
    let project = new Project(projectData);
    project.save((err, projectData) => {
        if(!err){
            res.send(projectData);
        }
    })
    
});

router.get('/', (req, res) => {
    var queryVar = req.query;
    
    if(queryVar.sortKey){

        Project.find().sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else if(queryVar.Project){
        
        Project.find({Project : queryVar.Project}, (err, doc) => {
            if(!err){
                
                res.send(doc);
            }else{
                console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }else{
        var query = Project.find();
        query.populate('parent');
        
        query.exec(function(err, docs) {
            if(!err){
                
                    res.send(docs);
            }else{
                console.log('Error in Retriving Project: ' + JSON.stringify(err, undefined, 2));
            }
        });
         

    }
    
});

module.exports = router;