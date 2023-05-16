import userModel from '../models/userModel.js';
import { hashPassword } from '../utils/authUtil.js';

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validations
    if (!name) {
      return res.send({ error: 'Name is required' });
    }
    if (!email) {
      return res.send({ error: 'Email is required' });
    }
    if (!password) {
      return res.send({ error: 'Password is required' });
    }
    if (!phone) {
      return res.send({ error: 'Phone number is required' });
    }
    if (!address) {
      return res.send({ error: 'Address is required' });
    }

    // check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.send({
        success: true,
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
