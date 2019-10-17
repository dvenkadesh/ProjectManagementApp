const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var {Parent} = require('../models/Parent');

router.post('/', (req, res) => {
    let parentData = req.body;
    let parent = new Parent(parentData);
    parent.save((err, parentData) => {
        if(!err){
            res.send(parentData);
        }
    })
    
});

router.get('/', (req, res) => {
    var queryVar = req.query;
    
    if(queryVar.sortKey){

        Parent.find().sort([[queryVar.sortKey, 1]]).exec(function(err, docs) {
            if(!err){
                res.send(docs);
            }else{
                console.log('error while sorting' + JSON.stringify(err, undefined, 2))
            }
        });
    }else if(queryVar.Parent){
        
        Parent.find({Parent : queryVar.Parent}, (err, doc) => {
            if(!err){
                
                res.send(doc);
            }else{
                console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }else{
        var query = Parent.find();
        query.populate('parent');
        
        query.exec(function(err, docs) {
            if(!err){
                
                    res.send(docs);
            }else{
                console.log('Error in Retriving Parnet: ' + JSON.stringify(err, undefined, 2));
            }
        });
         

    }
    
});

module.exports = router;