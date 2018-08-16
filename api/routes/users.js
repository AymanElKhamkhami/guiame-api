const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');


router.get("/", (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json(docs);
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get("/getbyid/:userId", (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.get("/getbyname/:name", (req, res, next) => {
    const name = req.params.name;
    User.find({ name: name })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided name" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.get("/:filter?", (req, res, next) => {
    const name = req.params.name;
    User.find({ name: name })
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided name" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        name: req.body.name,
        surename: req.body.surename,
        email: req.body.email,
        age: req.body.age
    });

    user
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                //message: 'Handling POST requests to /users',
                createdUser: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});


router.post('/login/', (req, res, next) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(error);
            res.status(500).json({
                error: err
            });
        } else {
            if (!user) {
                res.status(401).json({
                    message: 'Invalid email'
                });
            } else {
                if(user.password !== userData.password) {
                    res.status(401).json({
                        message: 'Invalid password'
                    });
                } else {
                    res.status(200).json(user);
                }
            }
        }
    });
});



module.exports = router;
