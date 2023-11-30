//import express, express router as shown in lecture code
import {Router} from 'express';
import * as helpers from '../helpers.js';
import { registerUser, loginUser } from '../data/users.js';
import { users } from '../config/mongoCollections.js';

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({error: 'YOU SHOULD NOT BE HERE!'});
});

router
  .route('/register')
  .get(async (req, res) => {
    res.render('../views/register', {title: "register"});
  })
  .post(async (req, res) => {
    let emailAddress = req.body.emailAddressInput;
    let username = req.body.usernameInput;
    let password = req.body.passwordInput;
    let confirmedPassword = req.body.confirmPasswordInput;
    try {
      emailAddress = emailAddress.trim(); helpers.validateEmail(emailAddress);
      username = username.trim(); helpers.validateUsername(username);
      password = password.trim(); helpers.validatePassword(password);
      confirmedPassword = confirmedPassword.trim(); helpers.validatePassword(confirmedPassword);
      const userCollection = await users();

      //https://stackoverflow.com/questions/7101703/how-do-i-make-case-insensitive-queries-on-mongodb
      const usersWithEmail = await userCollection.findOne({'emailAddress': {'$regex': "^" + emailAddress + "$", $options: 'i'}});
      if (usersWithEmail) {
        throw Error("There is already a user with that email address.");
      }
      const usersWithUsername = await userCollection.findOne({'username': {'$regex': "^" + username + "$", $options: 'i'}});
      if (usersWithUsername) {
        throw Error("There is already a user with that username.");
      }
    } catch(e) {
      return res.status(400).render("../views/register", {error: e, title: "register"});
    }
    
    try {
      const register = await registerUser(emailAddress, username, password);
      if (register.insertedUser) {
        return res.redirect("/login");
      } else {
        return res.status(500).json({error: "Internal Server Error"});
      }
    } catch(e) {
      return res.status(400).render("../views/register", {error: e, title: "register"});
    }
    });

router
  .route('/login')
  .get(async (req, res) => {
    res.render('../views/login', {title: "login"});
  })
  .post(async (req, res) => {
    let emailAddress = req.body.emailAddressInput;
    let password = req.body.passwordInput;
    try {
      emailAddress = emailAddress.trim(); helpers.validateEmail(emailAddress);
      password = password.trim(); helpers.validatePassword(password);
      req.session.user = await loginUser(emailAddress, password);
      res.redirect("/main");
    } catch(e) {
      res.status(400).render("../views/login", {error: e, title: "login"});
    }
  });

router.route('/main').get(async (req, res) => {
  const user = req.session.user;
  res.render('../views/main', {title: "main", username: user.username, email: user.emailAddress});
});

router.route('/create').get(async (req, res) => {
  res.render('../views/create');
});

router.route('/addCourse').get(async (req, res) => {
  res.render('../views/addCourse');
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.render('../views/logout', {title: "logout"});
});

export default router;