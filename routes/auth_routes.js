//import express, express router as shown in lecture code
import {Router} from 'express';
import * as helpers from '../helpers.js';
import { registerUser, loginUser } from '../data/users.js';
import { users, courses, professors } from '../config/mongoCollections.js';
import { addCourse } from '../data/course.js';
import { addProfessor } from '../data/professor.js';
import { ObjectId } from 'mongodb';

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
        return res.status(500).render("../views/register", {error: "Internal Server Error", title: "register"});
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
      res.redirect("/home");
    } catch(e) {
      res.status(400).render("../views/login", {error: e, title: "login"});
    }
  });

router.route('/home').get(async (req, res) => {
  const user = req.session.user;
  res.render('../views/home', {title: "home", username: user.username, email: user.emailAddress});
});

router
  .route('/create')
  .get(async (req, res) => {
    const courseCollection = await courses();
    const professorCollection = await professors();
    const allCourses = await courseCollection.find({}).toArray();
    const allProfessors = await professorCollection.find({}).toArray();
    res.render('../views/create', {title: "create review", courses: allCourses, professors: allProfessors});
  })
  .post(async (req, res) => {
    //TODO (validate inputs (make sure professor/course exist, ensure numbers are valid, etc), add new review as subdocument to user, add new review ID to both course and professor, and adjust their mean rating/difficulties)
    const user = req.session.user;
    const courseName = req.body.courseNameInput;
    const professorName = req.body.professorNameInput;
    const rating = parseInt(req.body.ratingInput);
    const difficulty = parseInt(req.body.difficultyInput);
    const reviewText = req.body.reviewTextInput;
    try {
      helpers.validateCourseName(courseName);
      helpers.validateName(professorName);
      if (rating < 1 || rating > 5) throw "Invalid rating";
      if (difficulty < 1 || difficulty > 5) throw "Invalid difficulty";

      if (!reviewText || typeof reviewText !== 'string') throw 'Review text cannot be empty';
      if (reviewText.trim().length === 0) throw 'Review text cannot be filled with just spaces';

      const userCollection = await users();
      const courseCollection = await courses();
      const professorCollection = await professors();

      const checkCourse = await courseCollection.findOne({name: courseName});
      if (!checkCourse) throw "Course does not exist, please add it first before reviewing it.";
      const checkProfessor = await professorCollection.findOne({name: professorName});
      if (!checkProfessor) throw "Professor does not exist, please add them first before reviewing them.";

      const newReviewId = new ObjectId();
      const newReview = {
        _id: newReviewId,
        professorName: professorName,
        courseName: courseName,
        reviewBody: reviewText,
        rating: rating,
        difficulty: difficulty,
        date: new Date().toDateString(), 
        reports: []
      };
      
      const updatedUser = await userCollection.updateOne({_id: new ObjectId(user._id)}, {$push: {reviews: newReview}});
      if (updatedUser.modifiedCount === 0) {
        throw Error("Internal Server Error");
      }

      const selectedCourse = await courseCollection.findOne({name: courseName});
      const selectedProfessor = await professorCollection.findOne({name: professorName});
      let newCourseAvgRating = Math.round((((selectedCourse.averageRating * selectedCourse.reviewIds.length) + rating) / (selectedCourse.reviewIds.length + 1)) * 100) / 100;
      let newCourseAvgDiff = Math.round((((selectedCourse.averageDifficulty * selectedCourse.reviewIds.length) + difficulty) / (selectedCourse.reviewIds.length + 1)) * 100) / 100;
      const updatedCourse = await courseCollection.updateOne({name: courseName}, {$push: {professorIds: selectedProfessor._id, reviews: newReview, reviewIds: newReviewId}, $set: {averageRating: newCourseAvgRating, averageDifficulty: newCourseAvgDiff}});
      if (updatedCourse.modifiedCount === 0) {
        throw Error("Internal Server Error");
      }
      
      let newProfessorAvgRating = Math.round((((selectedProfessor.averageRating * selectedProfessor.reviewIds.length) + rating) / (selectedProfessor.reviewIds.length + 1)) * 100) / 100;
      let newProfessorAvgDiff = Math.round((((selectedProfessor.averageDifficulty * selectedProfessor.reviewIds.length) + difficulty) / (selectedProfessor.reviewIds.length + 1)) * 100) / 100;
      const updatedProfessor = await professorCollection.updateOne({name: professorName}, {$push: {reviews: newReview, reviewIds: newReviewId}, $set: {averageRating: newProfessorAvgRating, averageDifficulty: newProfessorAvgDiff}});
      if (updatedProfessor.modifiedCount === 0) {
        throw Error("Internal Server Error");
      }
      console.log("Review successfully added to user, course, and professor.")

      return res.redirect("/home");
    } catch(e) {
      return res.status(400).render("../views/create", {error: e, title: "create review"});
    }
    
  });

router
  .route('/addCourse')
  .get(async (req, res) => {
    res.render('../views/addCourse', {title: "add course"});
  })
  .post(async (req, res) => {
    let courseName = req.body.courseNameInput;
    try {
      courseName = courseName.trim(); helpers.validateCourseName(courseName);
    } catch(e) {
      return res.status(400).render("../views/addCourse", {error: e, title: "add course"});
    }

    try {
      const add = await addCourse(courseName);
      if (add.insertedCourse) {
        return res.redirect("/home");
      } else {
        return res.status(500).render("../views/addCourse", {error: "Internal Server Error", title: "add course"});
      }
    } catch(e) {
      return res.status(400).render("../views/addCourse", {error: e, title: "add course"});
    }
  });

  router
  .route('/addProfessor')
  .get(async (req, res) => {
    res.render('../views/addProfessor', {title: "add professor"});
  })
  .post(async (req, res) => {
    let professorFirstName = req.body.professorFirstNameInput;
    let professorLastName = req.body.professorLastNameInput;
    try {
      professorFirstName = professorFirstName.trim(); helpers.validateProfessorName(professorFirstName, "first");
      professorLastName = professorLastName.trim(); helpers.validateProfessorName(professorLastName, "last");
    } catch(e) {
      return res.status(400).render("../views/addProfessor", {error: e, title: "add professor"});
    }

    try {
      const add = await addProfessor(professorFirstName, professorLastName);
      if (add.insertedCourse) {
        return res.redirect("/home");
      } else {
        return res.status(500).render("../views/addProfessor", {error: "Internal Server Error", title: "add professor"});
      }
    } catch(e) {
      return res.status(400).render("../views/addProfessor", {error: e, title: "add professor"});
    }
  });

router.route('/prof')
  .get(async (req, res) => {
    try {
      const professorCollection = await professors();
      const allProfessors = await professorCollection.find({}).toArray();
      res.render('../views/professorSelect', { title: 'Professor', professors: allProfessors });
    } catch (error) {
      return res.status(400).render("../views/professorSelect", {error: error, title: "professor"});
    }
  })
  .post(async (req, res) => {
    try {
      const professorName = req.body.professorNameInput.trim();
      const professorCollection = await professors();
      const checkProfessor = await professorCollection.findOne({name: professorName});
      if (!checkProfessor) {
        throw Error("Professor not found.");
      }
      const userCollection = await users();
      const professorReviews = [];
      const allUsers = await userCollection.find({}).toArray();
      for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < allUsers[i].reviews.length; j++) {
          if (allUsers[i].reviews[j].professorName === professorName) {
            professorReviews.push(allUsers[i].reviews[j]);
          }
        }
      }
      res.render('../views/prof', { title: 'prof', professorName: professorName, reviews: professorReviews, rating: checkProfessor.averageRating, difficulty: checkProfessor.averageDifficulty });
    } catch (error) {
      console.log(error);
      return res.status(400).render("../views/professorSelect", {error: error, title: "prof"});
    }
  });


router.route('/course').get(async (req, res) => {
  try {
    const courseCollection = await courses();
    const allCourses = await courseCollection.find({}).toArray();
    res.render('../views/courseSelect', { title: 'Course', courses: allCourses });
  } catch (error) {
    return res.status(400).render("../views/courseSelect", {error: error, title: "course"});
  }
}
).post(async (req, res) => {
  try {
    const courseName = req.body.courseNameInput.trim();
    const courseCollection = await courses();
    const checkCourse = await courseCollection.findOne({name: courseName});
    if (!checkCourse) {
      throw Error("Course not found.");
    }
    const userCollection = await users();
    const courseReviews = [];
    const allUsers = await userCollection.find({}).toArray();
    for (let i = 0; i < allUsers.length; i++) {
      for (let j = 0; j < allUsers[i].reviews.length; j++) {
        if (allUsers[i].reviews[j].courseName === courseName) {
          courseReviews.push(allUsers[i].reviews[j]);
        }
      }
    }
    res.render('../views/course', { title: 'course', courseName: courseName, reviews: courseReviews, rating: checkCourse.averageRating, difficulty: checkCourse.averageDifficulty });
  } catch (error) {
    console.log(error);
    return res.status(400).render("../views/professorSelect", {error: error, title: "prof"});
  }
});

router.route('/bestProfessors').get(async (req, res) => {
  try {
    const courseCollection = await courses();
    const allCourses = await courseCollection.find({}).toArray();
    res.render('../views/filter', { title: 'Filter Professors', courses: allCourses });
  } catch (error) {
    return res.status(400).render("../views/courseSelect", {error: error, title: "course"});
  }
}
).post(async (req, res) => {
  try {
    const courseName = req.body.courseNameInput.trim();
    const filter = req.body.filterByInput.trim();
    if (filter !== "rat" && filter !== "dif") {
      throw Error("Invalid filter");
    }
    const courseCollection = await courses();
    const checkCourse = await courseCollection.findOne({name: courseName});
    if (!checkCourse) {
      throw Error("Course not found.");
    }
    const professorCollection = await professors();
    const courseProfessors = [];
    
    for (let i = 0; i < checkCourse.professorIds.length; i++) {
      const professor = await professorCollection.findOne({_id: checkCourse.professorIds[i]});
      if (professor) {
        courseProfessors.push(professor);
      }
    }

    if (filter === "rat") {
      courseProfessors.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      courseProfessors.sort((a, b) => a.averageDifficulty - b.averageDifficulty);
    }

    res.render('../views/filtered', { title: 'filtered', courseName: courseName, professors: courseProfessors});
  } catch (error) {
    console.log(error);
    return res.status(400).render("../views/professorSelect", {error: error, title: "prof"});
  }
});

router.route('/logout').get(async (req, res) => {
  req.session.destroy();
  res.render('../views/login', {title: "login"});
});

router.get('/report-review/:id', async (req, res) => {
  const reviewId = req.params.id;

  try {
      res.render('../views/reportReview', { reviewId });
  } 
  catch (error) {
      return res.status(500).render("../views/reportReview", {error: "Internal Server Error", title: "report review"});
  }
});
router.post('/report-review/:id', async (req, res) => {
  const reviewId = req.params.id;
  const explanation = req.body.explanation;

  try {
    const userCollection = await users();
    await userCollection.updateOne(
      { 'reviews._id': reviewId },
      { $set: { 'reviews.$.reported': true, 'reviews.$.explanation': explanation } }
    );

    return res.redirect(`/report-review/${reviewId}?successMessage=Review+reported+successfully`);
  } catch (error) {
    return res.status(500).render("../views/reportReview", { error: "Internal Server Error", title: "report review" });
  }
});


export default router;