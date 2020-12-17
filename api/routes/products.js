const express = require("express");
const mongooes = require("mongoose");
const routes = express.Router();

const productModel = require("../models/product");

routes.get("/", (req, res, next) => {
  productModel.find()
    .exec()
    .then(docs => {
        if(docs.length >= 0){
            res.status(200).json(docs);
        } else {
            res.status(404).json({
                message: 'NOT ENTRIES FOUND!!!!'
            });
        }
       
    })
    .catch(err => {
        res.status(404).json({
            error: err
        })
    });
});

routes.post("/", (req, res, next) => {
  // let product ={
  //     name: req.body.name,
  //     price: req.body.price
  // }
  let product = new productModel({
    _id: mongooes.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.log(err));
  res.status(201).json({
    message: "handling POST /Products",
    productDetail: product,
  });
});

routes.get("/:productID", (req, res, next) => {
  let id = req.params.productID;
  let doc = productModel
    .findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          error: "NO VALID ENTRY FOUND FOR PRODUCT ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
});

routes.patch("/:productID", (req, res, next) => {
  let id = req.params.productID;
  let updateOps = {};
  for( var prop of req.body){
      updateOps[prop.newName]= prop.value;
  }
  productModel.update({_id: id}, {
      $set: updateOps
  }).exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
});

routes.delete("/:productID", (req, res, next) => {
    let id = req.params.productID;
    productModel.remove({_id: id}).exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(404).json({
                error : err
            });
        })
});

module.exports = routes;
