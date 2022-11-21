/* eslint-disable prettier/prettier */
import User from '../models/user.model';
import bcrypt from 'bcrypt';

//create new user Refactore-registration for hash password
export const newUserRegister = async (body) => {
  const email = await User.findOne({ email: body.email });
  if (email) {
    throw new Error('Already Exist EmailId');
  } else {
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(body.password,saltRounds)
    body.password = hashpassword
    const data = await User.create(body);
    return data;
  }
};

//Refactor-user-login
export const User_login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data !== null) {
    console.log('Password',body.password);
    const result = await bcrypt.compare(body.password,data.password)
    if (result){
      return data;
    }else {
      throw new Error('Invalid Password');
    }
  } else {
    throw new Error('Invalid Email');
  }
};
