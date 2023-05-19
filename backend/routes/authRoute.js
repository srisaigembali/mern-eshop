import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPassWordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';

// router object
const router = express.Router();

// routing
// register
router.post('/register', registerController);

// login
router.post('/login', loginController);

// test routes
router.get('/test', requireSignIn, isAdmin, testController);

// forgot password
router.post('/forgot-password', forgotPassWordController);

// protected user route auth
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put('/profile', requireSignIn, updateProfileController);

// user orders
router.get('/orders', requireSignIn, getOrdersController);

// all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  '/order-status/:orderId',
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
