import express from "express";
const router = express.Router();
import { requiredSignIn, isAdmin } from "../middleware/authMiddleware.js";

import {
  createCategoryController,
  updateCategoryController,
  getCategoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

// create category only ---Admin
router.post(
  "/create-category",
  requiredSignIn,
  isAdmin,
  createCategoryController
);

// update category --admin
router.put(
  "/update-category/:id",
  requiredSignIn,
  isAdmin,
  updateCategoryController
);

// get all category
router.get("/get-category", getCategoryController);

// Get Single category
router.get("/single-category/:slug", singleCategoryController);

// delete category controller
router.delete(
  "/delete-category/:id",
  requiredSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
