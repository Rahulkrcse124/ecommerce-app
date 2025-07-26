import express from "express";
const router = express.Router();
import formidable from "express-formidable";
import { requiredSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getPhotoProductController,
  getProductController,
  getSingleProductController,
  updateProductController,
  productFilter,
  productCountController,
  productListController,
  productSearchController,
  releatedProductController,
  productCategoryController,
} from "../controllers/productController.js";
import Formidable from "express-formidable"; // for image save

// POST Create product ---Admin
router.post(
  "/create-product",
  requiredSignIn,
  isAdmin,
  Formidable(),
  createProductController
);

// Get All Product Route
router.get("/get-product", getProductController);

// Get Single Product
router.get("/get-singleproduct/:slug", getSingleProductController);

// Get Photo
router.get("/get-photoproduct/:id", getPhotoProductController);

// Update Product Routes ---Admin
router.put(
  "/update-product/:id",
  formidable(),
  requiredSignIn,
  isAdmin,
  updateProductController
);

// delete product contoroller  --- Admin
router.delete(
  "/delete-product/:id",
  requiredSignIn,
  isAdmin,
  deleteProductController
);

// product filter
router.post("/filters-product", productFilter);

// productcount
router.get("/product-count", productCountController);

// pagination
router.get("/product-list/:page", productListController);

// serach product
router.get("/search-product/:keyword", productSearchController);

// releated product
router.get("/related-product/:pid/:cid", releatedProductController);

// product category wise
router.get("/product-category/:slug", productCategoryController);

export default router;
