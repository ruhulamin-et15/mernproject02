import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController, updateCategoryController,getCategoriesController, getCategoryController, deleteCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

//routes
//create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//get all category 
router.get("/get-category", getCategoriesController);

//get single category 
router.get("/get-category/:id", getCategoryController);

//update category
router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController)

//delete category
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController)


export default router;