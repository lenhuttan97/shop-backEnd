const mongooes = require('mongoose');

const productModel = require('../models/product');


exports.PRODUCT_GET_ALL = (req, res, next) => {
    productModel.find()
      .exec()
      .then(docs => {
          let response = {
              count: docs.length,
              products: docs.map(doc => {
                  return {
                      _id: doc._id,
                      name: doc.name,
                      price: doc.price,
                      productImage: doc.productImage,
                      request: {
                          method: 'GET',
                          url: 'http://localhost:3000/products/'+doc.id
                      }
                  }
              }),
          }
          res.status(200).json(response);
       })
      .catch(err => {
          res.status(404).json({
              error: err
          })
      });
  };

exports.PRODUCT_POST_ONE = (req, res, next) => {
    let product = new productModel({
      _id: mongooes.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    });
    product
      .save()
      .then((result) => {
        res.status(201).json({
          productDetail: {
              name: result.name,
              price: result.price,
              _id: result._id,
              productImage: result.productImage,
              request: {
                  method: 'GET',
                  url: 'http://localhost:3000/products/'+result.id
              }
          },
        });
      })
      .catch((err) => {
          res.status(404).json({
              error: err,
            });
      });
  }

exports.PRODUCT_GET_ONE = (req, res, next) => {
    let id = req.params.productID;
    productModel.findById(id)
      .select('name price _id productImage')
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(200).json({
              product: doc,
              request: {
                  method: 'GET_ALL_PRODUCT',
                  url: 'http://localhost:3000/products'
              }
          });
        } else {
          res.status(404).json({
            error: "NO VALID ENTRY FOUND FOR PRODUCT ID",
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          error: err
        });
      });
  }

exports.PRODUCT_UPDATE_ONE = (req, res, next) => {
    let id = req.params.productID;
    let updateOps = {};
    for( var prop of req.body){
        updateOps[prop.newName]= prop.value;
    }
    productModel.update({_id: id}, {
        $set: updateOps
    }).exec()
      .then(result => {
          res.status(200).json({
              message: 'PRODUCT UPDATED!!!!',
              request: {
                  method: 'GET',
                  url: 'http://localhost:3000/products/'+id
              }
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              error : err
          })
      })
  }

exports.PRODUCT_DELETE_ONE = (req, res, next) => {
    let id = req.params.productID;
    productModel.remove({_id: id}).exec()
        .then(result => {
            res.status(200).json({
                message: 'PRODUCT DELETTED!!!',
                request: {
                    method: 'POST',
                    url: 'http://localhost:3000/products',
                    body: {
                        name: "String",
                        price: "Number"
                    }
                }
            });
        })
        .catch(err => {
            res.status(404).json({
                error : err
            });
        })
}