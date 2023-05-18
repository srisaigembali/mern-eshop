import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import {
  createCategoryController,
  updateCategoryController,
  categoryControlller,
  singleCategoryController,
  deleteCategoryCOntroller,
} from '../controllers/categoryController.js';

const router = express.Router();

// routes
// create category
router.post(
  '/create-category',
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category
router.put(
  '/update-category/:id',
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// get all categories
router.get('/get-categories', categoryControlller);

// get single category
router.get('/get-category/:slug', singleCategoryController);

//delete category
router.delete(
  '/delete-category/:id',
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
