import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductsController,
  getProductController,
  productPhotoController,
  updateProductController,
  deleteProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  braintreeTokenController,
  braintreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
//create product
router.post("/create-product", formidable(), createProductController);

//get all products
router.get("/get-products", getProductsController);

//single product get
router.get("/get-product/:slug", getProductController);

//get photo
router.get("/get-photo/:pid", productPhotoController);

//update product
router.put(
  "/update-product/:pid",
  formidable(),
  requireSignIn,
  updateProductController
);

//delete product
router.delete("/delete-product/:pid", requireSignIn, deleteProductController);

//filter product
router.post("/product-filters", productFilterController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//payments route
//token
router.get("/braintree-token", braintreeTokenController);

//payments
router.post("/braintree-payment", requireSignIn, braintreePaymentController);

export default router;
