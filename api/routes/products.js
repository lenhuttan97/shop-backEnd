const express = require("express");
const routes = express.Router();

const checkAuth = require('../middleware/check-auth');
const productController = require('../controller/product');
const upload =require('../middleware/upload-file');


routes.get("/", checkAuth, productController.PRODUCT_GET_ALL);

routes.post("/", upload.single('productImage'), productController.PRODUCT_POST_ONE);

routes.get("/:productID", productController.PRODUCT_GET_ONE);

routes.patch("/:productID", productController.PRODUCT_UPDATE_ONE);

routes.delete("/:productID", productController.PRODUCT_DELETE_ONE);

module.exports = routes;
