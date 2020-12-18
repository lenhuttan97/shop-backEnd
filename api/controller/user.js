const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const userModel = require('../models/user');

exports.USER_SIGNUP = (req, res, next) => {
    // console.log(req.body);
     userModel.find({ email: req.body.email}).exec()
         .then(user => {
           //  console.log(user);
             if(user.length >= 1){
                 res.status(409).json({
                     message: 'email exits!!!'
                 })
             }
         })
         .catch(err => {
             res.status(500).json({
                 message: err
             })
         });
     bcrypt.hash(req.body.password, 10, (err, hash) => {
         if (err) {
             return res.status(500).json({
                 error: err
             });
         } else {
             let user = new userModel({
                 _id: mongoose.Types.ObjectId(),
                 email: req.body.email,
                 password: hash
             });
             user.save()
                 .then(result => {
                     res.status(201).json({
                         message: 'USER CREATE!!!'
                     })
                 })
                 .catch(err => {
                     res.status(500).json({
                         error: err
                     })
                 });
         }
     });
 }

exports.USER_LOGIN = (req, res, next) => {
    userModel.find({ email: req.body.email }).exec()
        .then(user => {
            if(user.length < 1) {
                res.status(401).json({
                    message: 'Auth failes!!!'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed !!!'
                    })
                }
                if(result) {
                    let token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h",
                    });
                    return res.status(200).json({
                        message: 'Auth successful !!!',
                        token: token
                    })
                }
                res.status(401).json({
                    message: 'Auth failed !!!'
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}

exports.USER_DELETE = (req, res, next) => {
    userModel.remove({ _id: req.params.id})
        .exec()
        .then(doc => {
            res.status(200).json({
                message: "users removed!!!"
            })
        })
        .catch(err => 
            res.status(500).json({
                error: err
            })
        );
}