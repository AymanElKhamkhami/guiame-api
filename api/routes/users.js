const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
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


router.post('/register/', (req, res) => {
    let userData = req.body;
    const newUser = new User(//userData
        {
            _id: new mongoose.Types.ObjectId(),
            username: 'temp',//userData.username,
            name: 'temp',//userData.name,
            surename: 'temp',//userData.surename,
            email: userData.email,
            age: 28,//userData.age,
            password: userData.password
        }
    );

    User.findOne({ email: userData.email }, (err, existingUser) => {
        if (err) {
            console.log(error);
            res.status(500).json({
                error: err
            });
        } else {
            if (existingUser) {
                res.status(403).json({
                    message: 'Existing email'
                });
            } else {
                newUser.save( (err, registeredUser) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        let payload = { subject: registeredUser._id };
                        let token = jwt.sign(payload, 'myStaticKey');
                        let publicData = {
                            username: registeredUser.username,
                            name: registeredUser.name,
                            surename: registeredUser.surename,
                            email: registeredUser.email
                        };
                        res.status(200).json({
                            token: token,
                            userData: publicData
                        });
                    }
                });
            }
        }
    });

});


router.post('/login/', (req, res) => {
    let userData = req.body;

    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        } else {
            if (!user) {
                res.status(401).json({
                    message: 'Invalid email'
                });
            } else {
                if (user.password !== userData.password) {
                    res.status(401).json({
                        message: 'Invalid password'
                    });
                } else {
                    let payload = { subject: user._id };
                    let token = jwt.sign(payload, 'myStaticKey');
                    let publicData = {
                        username: user.username,
                        name: user.name,
                        surename: user.surename,
                        email: user.email
                    };
                    res.status(200).json({
                        token: token,
                        userData: publicData
                    });
                }
            }
        }
    });

    // const user = new User({
    //     _id: new mongoose.Types.ObjectId(),
    //     username: 'Aymankun',
    //     name: 'Ayman',
    //     surename: 'El Khamkhami',
    //     email: 'ayman-khm@guiame.com',
    //     password: 'kaka',
    //     age: 28
    // });

    // if (user.email !== userData.email) {
    //     res.status(401).json({
    //         message: 'Invalid email'
    //     });
    // } else {
    //     if (user.password !== userData.password) {
    //         res.status(401).json({
    //             message: 'Invalid password'
    //         });
    //     } else {
    //         let payload = { subject: user._id };
    //         let token = jwt.sign(payload, 'myStaticKey');
    //         let publicData = { username: user.username, name: user.name, surename: user.surename, email: user.email };
    //         res.status(200).json({
    //             token: token, 
    //             userData: publicData
    //         });
    //     }
    // }

});


module.exports = router;
