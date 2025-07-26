import express from "express";
import {
  loginController,
  testController,
  userRegister,
  getUserById,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";

import { requiredSignIn, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// register post
router.post("/register", userRegister);

// login
router.post("/login", loginController);

// forgot password: post
router.post("/forgot-password", forgotPasswordController);

// protected auth dashboad
router.get("/user-auth", requiredSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// dashboad admin
router.get("/admin-auth", requiredSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// test
router.get("/test", requiredSignIn, isAdmin, testController);

// find user by id
router.get("/user/:id", getUserById);

// update profile
router.put("/profile", requiredSignIn, updateProfileController);


export default router;
