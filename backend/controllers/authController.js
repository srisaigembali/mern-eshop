import userModel from '../models/userModel.js';
import { comparePassword, hashPassword } from '../utils/authUtil.js';
import JWT from 'jsonwebtoken';

// Post Register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validations
    if (!name) {
      return res.send({ message: 'Name is required' });
    }
    if (!email) {
      return res.send({ message: 'Email is required' });
    }
    if (!password) {
      return res.send({ message: 'Password is required' });
    }
    if (!phone) {
      return res.send({ message: 'Phone number is required' });
    }
    if (!address) {
      return res.send({ message: 'Address is required' });
    }

    // check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.send({
        success: false,
        message: 'Already registered! Please login',
      });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();
    res.status(201).send({
      success: true,
      message: 'User registered succesfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in registration',
      error,
    });
  }
};

// Post Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: 'Invalid email or password',
      });
    }

    //check for user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Email not registered',
      });
    }
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).send({
        success: false,
        message: 'Invalid password',
      });
    }

    // create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRETKEY, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    res.status(200).send({
      success: true,
      message: 'Login Successful',
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in login',
      error,
    });
  }
};

// test
export const testController = (req, res) => {
  res.send('Protected Routes');
};
