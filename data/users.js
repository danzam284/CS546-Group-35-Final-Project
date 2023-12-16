//import mongo collections, bcrypt and implement the following data functions
import {users} from '../config/mongoCollections.js';
import bcrypt from 'bcrypt';
import * as helpers from '../helpers.js';

export const registerUser = async (
  emailAddress,
  username,
  password,
) => {
  emailAddress = emailAddress.trim(); helpers.validateEmailStevens(emailAddress);
  username = username.trim(); helpers.validateUsername(username);
  password = password.trim(); helpers.validatePassword(password);

  const userCollection = await users();
  //https://stackoverflow.com/questions/7101703/how-do-i-make-case-insensitive-queries-on-mongodb
  const usersWithEmail = await userCollection.findOne({'emailAddress': {'$regex': "^" + emailAddress + "$", $options: 'i'}});
  if (usersWithEmail) {
    throw "There is already a user with that email address.";
  }
  const usersWithUsername = await userCollection.findOne({'username': {'$regex': "^" + username + "$", $options: 'i'}});
  if (usersWithUsername) {
    throw "There is already a user with that username.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {emailAddress, username, password: hashedPassword, admin: false, reviews: []};
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not add user.";
  }

  return {insertedUser: true};
};

export const loginUser = async (emailAddress, password) => {
  emailAddress = emailAddress.trim(); helpers.validateEmail(emailAddress);
  password = password.trim(); helpers.validatePassword(password);

  const userCollection = await users();
  //https://stackoverflow.com/questions/7101703/how-do-i-make-case-insensitive-queries-on-mongodb
  const user = await userCollection.findOne({'emailAddress': {'$regex': "^" + emailAddress + "$", $options: 'i'}});
  if (!user) {
    throw "Either the email address or password is invalid";
  }

  const comparePasswords = await bcrypt.compare(password, user.password);
  if (!comparePasswords) {
    throw "Either the email address or password is invalid";
  }
  return {"_id": user._id ,"emailAddress": user.emailAddress, "username": user.username, "admin": user.admin};
};
