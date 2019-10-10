const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

// ==>localhost:3000/user/
router.get('/', (req, res) => {

        User.find((err, doc) => {
            if (!err) {
                res.send({ 'Success': true, 'Data': doc });
            } else {
                console.log('Error in adding data ' + JSON.stringify(err, undefined,2));
            }
        });
});

router.get('/:_id', (req, res) => {
    if (!ObjectId.isValid(req.params._id)) {
        return res.sendStatus(400).send({ 'Success': false, 'message': 'No User Id tagged to this value' });
    } else {
        User.findById(req.params._id, (err, doc) => {
            if (!err) {
                res.send({ 'Success': true, 'Data': doc });
            }
            else {
                res.send({ 'Success': false, 'message': 'No record found' });
            }
        });
    }
});

router.put('/:_id', (req, res) => {
    if (!ObjectId.isValid(req.params._id)) {
        return res.sendStatus(400).send({ 'Success': false, 'message': 'No User Id tagged to this value' });
    }
    
    var usr = {
        First_Name : req.body.First_Name,
        Last_Name : req.body.Last_Name,
        Employee_Id : req.body.Employee_Id,
    }

    User.findByIdAndUpdate(req.params._id, { $set : usr}, {new:true} ,(err, doc) => {
        if (!err) {
            res.send({ 'Success': true, 'Data': doc });
        }
        else {
            res.send({ 'Success': false, 'message': 'No record found' });
        }
    });

   });

   router.delete('/:_id', (req, res) => {
    if (!ObjectId.isValid(req.params._id)) {
        return res.sendStatus(400).send({ 'Success': false, 'message': 'No User Id tagged to this value' });
    }
    
    User.findByIdAndRemove(req.params._id,(err, doc) => {
        if (!err) {
            res.send({ 'Success': true, 'Data': doc });
        }
        else {
            res.send({ 'Success': false, 'message': 'No record found' });
        }
    });

   });

router.post('/', (req, res) => {
    var usr = new User({
        First_Name: req.body.First_Name,
        Last_Name: req.body.Last_Name,
        Employee_Id: req.body.Employee_Id
        });

    usr.save((err, doc) => {
        if (!err) {
            res.send({ 'Success': true, 'Data': doc });
        } else {
            console.log('Error in adding data ' + JSON.stringify(err, undefined,2));
        }
    });
});


module.exports = router;