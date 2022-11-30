/* eslint-disable prettier/prettier */
import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

//route to create a new user
router.post('/register', newUserValidator, userController.newUserRegister);

//route to login a user
router.post('/login', userController.User_login);

//route to forgot user password
router.post('/forgotpassword', userController.forgotPassword);

export default router;
