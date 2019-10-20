const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Project} = require('../models/Project');

router.post('/edit/:Project_Id', (req, res) => {
    let projId = req.params.Project_Id;
    Project.findOne({Project_Id: projId}, (err, projData) =>{
        if(err){

        }else{
            if(projData){
                projData.Project_Name = req.body.Project_Name;
                projData.Start_Date = req.body.Start_Date;
                projData.End_Date = req.body.End_Date;
                projData.Priority = req.body.Priority;
                projData.User = req.body.User;

                projData.save((err, projData) => {
                    if(err){

                    }else{
                        res.send(projData);
                    }
                });
            }
        }
    });
    
//}
});

router.post('/add', (req, res) => {
    let projectData = req.body;
    let project = new Project(projectData);
    project.save((err, projectData) => {
        if(!err){
            res.send(projectData);
        }
    })
    
});

router.get('/:Project_Id', (req, res) => {
    Project.deleteOne({Project_Id: req.params.Project_Id}, function(err, docs) {
        if(!err){
            console.log('inside delete');
            res.send(docs);
            //res.status(400).send({"Message": "Project Search Failed"});
        }else{
            res.status(400).send({"Message": "Project Search Failed"});
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