import express from "express";
import { createCategory, getCategories, deleteCategory, editCategory } from "../controllers/categories.js";

const router = express.Router();

router.post("/guardarcategoria", createCategory);
router.get("/obtenercategorias", getCategories)
router.delete("/eliminarcategoria", deleteCategory)
router.patch("/editarcategoria", editCategory )

export default router;