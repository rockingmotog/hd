const express = require('express');
const recordRoutes = express.Router();
const dbo = require('../db/conn');


// convert string to object id : _id 
const ObjectId = require('mongodb').ObjectId;


// get record by id
recordRoutes.route('/record/:id').get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    let myquery = { _id: ObjectId(req.params.id) };

    db_connect
        .collection('records')
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result)
        });

});



// get all records
recordRoutes.route('/record').get(function (req, res) {
    let db_connect = dbo.getDb("employees");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
        .collection('records')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result)
        });
});