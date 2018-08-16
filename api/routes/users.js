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
    const user = new User(userData
        //{
        // _id: new mongoose.Types.ObjectId(),
        // username: userData.username,
        // name: userData.name,
        // surename: userData.surename,
        // email: req.body.email,
        // age: userData.age
        //}
    );

    user.save(error, registeredUser)
        .then(result => {
            console.log(result);
            let payload = { subject: registeredUser._id };
            let token = jwt.sign(payload, 'myStaticKey');
            res.status(201).send({token});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});


router.post('/login/', (req, res) => {
    let userData = req.body;

    // User.findOne({ email: userData.email }, (err, user) => {
    //     if (err) {
    //         console.log(error);
    //         res.status(500).json({
    //             error: err
    //         });
    //     } else {
    //         if (!user) {
    //             res.status(401).json({
    //                 message: 'Invalid email'
    //             });
    //         } else {
    //             if(user.password !== userData.password) {
    //                 res.status(401).json({
    //                     message: 'Invalid password'
    //                 });
    //             } else {
    //                  let payload = { subject: user._id };
    //                  let token = jwt.sign(payload, 'myStaticKey');
    //                  res.status(200).send({token});
    //                  res.status(200).json(user);
    //             }
    //         }
    //     }
    // });

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: 'Aymankun',
        name: 'Ayman',
        surename: 'El Khamkhami',
        email: 'ayman-khm@guiame.com',
        password: 'kaka',
        age: 28
    });

    if (user.email !== userData.email) {
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
            res.status(200).send({token});
        }
    }

});



module.exports = router;
