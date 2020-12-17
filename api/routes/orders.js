const express = require('express');
const routes = require('./products');
const route = express.Router();

route.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'This is API GET Orders'
    });
});

route.post('/', (req, res, next) => {
    let order = {
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'This is API POST Orders',
        orderDetail: order
    });
});

route.get('/:orderID', (req, res, next) => {
    let id = req.params.orderID;
    if ( id === 'specal') {
        res.status(200).json({
            message: 'This is API get OrdersID' + id,
            id: id
        });
    } else {
        res.status(200).json({
            message: 'missed orderID specal'
        })
    }
    
});

route.patch('/:orderID', (req, res, next) => {
        res.status(200).json({
            message: 'This is API UPDATE OrdersID' + req.params.orderID,
        });    
});

route.get('/:orderID', (req, res, next) => {
    res.status(200).json({
        message: 'This is API DELETE OrdersID' + req.params.orderID,
    });  
});

module.exports = routes;