import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPassWordController,
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

// protected route auth
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
