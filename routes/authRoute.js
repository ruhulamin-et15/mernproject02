import express from "express";
import {
  loginController,
  registerController,
  testController,
  forgotPasswordController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//register || post
router.post("/register", registerController);

//login || post
router.post("/login", loginController);

//forgot || post
router.post("/forgot-password", forgotPasswordController);

//test protected route
router.get("/test", requireSignIn, isAdmin, testController);

//protected user auth || get
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected admin auth || get
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//update profile || put
router.put("/profile", requireSignIn, updateProfileController);

export default router;
