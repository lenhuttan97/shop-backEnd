const express = require('express');
const routes = express.Router();

const orderController =require('../controller/order');


routes.get('/', orderController.ORDER_GET_ALL);

routes.post('/', orderController.ORDER_POST_ONE);

routes.get('/:orderID', orderController.ORDER_GET_ONE);

routes.patch('/:orderID', orderController.ORDER_UPDATE_ONE);

routes.delete('/:orderID', orderController.ORDER_DELETE_ONE);

module.exports = routes;