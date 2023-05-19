import express from 'express';
import formidable from 'express-formidable';
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  searchProductController,
  similarProductsController,
  updateProductController,
} from '../controllers/productController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

const router = express.Router();

// routes
// create product
router.post(
  '/create-product',
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// update product
router.put(
  '/update-product/:pid',
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// get all products
router.get('/get-products', getProductController);

// get single product
router.get('/get-product/:slug', getSingleProductController);

// get photo
router.get('/product-photo/:pid', productPhotoController);

// delete product
router.delete('/delete-product/:pid', deleteProductController);

// filter product
router.post('/product-filters', productFiltersController);

// product count
router.get('/product-count', productCountController);

// products per page
router.get('/product-list/:page', productListController);

// search product
router.get('/search/:keyword', searchProductController);

//similar product
router.get('/similar-products/:pid/:cid', similarProductsController);

// category wise product
router.get('/product-category/:slug', productCategoryController);

export default router;
