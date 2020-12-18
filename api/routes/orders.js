const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

const orderModel = require('../models/order');
const productModel = require('../models/product');


routes.get('/', (req, res, next) => {
    orderModel.find()
        .select('_id productId quantity')
        .exec()
        .then(docs => {
            let response = {
                count: docs.length,
                orders: docs.map(doc =>{
                    return {
                        _id: doc._id,
                        productId: doc.productId,
                        quantity: doc.quantity,
                        request: {
                            method: 'GET',
                            url: 'http://localhost:3000/orders/'+doc._id
                        } 
                    }
                }),
            };
            res.status(200).json(response);
        })
        .catch(err => {
            res.status(404).json({
                error: err
            });
        });
});

routes.post('/', (req, res, next) => {
    productModel.findById(req.body.productId).exec()
        .then(product => {
            if (!product){
                res.status(401).json({
                    message: 'PRODUCT NOT FOUND!!!!'
                })
            }
            let order = new orderModel({
                _id: mongoose.Types.ObjectId(),
                productId: product._id,
                quantity: req.body.quantity
            });
            return order.save();
        })
        .then(result => {
            res.status(201).json({
                message: 'Order created!!!',
                request: {
                    method: 'GET',
                    url: 'http://localhost:3000/orders/'+result._id
                }
            })
        })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    });
});

routes.get('/:orderID', (req, res, next) => {
    let id = req.params.orderID;
    orderModel.findById(id).exec()
        .then(doc => {
            res.status(200).json({
                    _id: doc._id,
                    productId: doc.productId,
                    quantity: doc.quantity,
                request:{
                    method: 'GET_ALL_ORDER',
                    url: 'http://localhost:3000/orders'
                }
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        });    
});

routes.patch('/:orderID', (req, res, next) => {
    let id = req.params.orderID;
      let orderUpdate ={};
      for (let props in req.body){
        orderUpdate[props.key]=props.value;
      };
      orderModel.update({_id:id}, {
        $set: orderUpdate
    }).exec()
        .then(result => {
            res.status(200).json({
                message: 'order updated!!!!',
                request:{
                    method: 'GET',
                    url: 'http://localhost:3000/orders/'+ id
                }
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        });
});

routes.delete('/:orderID', (req, res, next) => {
    orderModel.remove({_id: orderID}).exec()
        .then(result => {
            res.status(200).json({
                message: 'ORDER DELETTED!!!!'
            })
        })
        .catch(err => {
            res.status(404).json({
                error: err
            })
        }); 
});

module.exports = routes;