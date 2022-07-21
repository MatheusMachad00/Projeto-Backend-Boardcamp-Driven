import express from 'express';
import { getCategories, insertCategory } from '../controllers/categoriesController.js';
import { validateCategory } from '../middlewares/validateCategory.js';

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", validateCategory, insertCategory);

export default router;