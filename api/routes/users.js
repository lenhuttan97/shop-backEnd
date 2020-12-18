const express = require('express');
const routes = express.Router();

const userController = require('../controller/user');

routes.post('/signup', userController.USER_SIGNUP);

routes.post('/login', userController.USER_SIGNUP);

routes.delete('/:id', userController.USER_DELETE);


module.exports = routes;