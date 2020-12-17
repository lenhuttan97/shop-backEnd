const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const routeProduct = require('./api/routes/products');
const routeOrder = require('./api/routes/orders');

app.use(morgan('dev')); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// connect database
const getConnectDB = require('./config/configDB');
mongoose.connect(getConnectDB.getDbConnectionString(), (err) => {
    if(err) console.log(err)
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

app.use('/products', routeProduct);
app.use('/orders', routeOrder);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status =404;
    next(error);
});

app.use((err, req, res, next) => {
     res.status(err.status || 500);
     res.json({
         error :{
             message: err.message
         }
     })
})


module.exports = app;