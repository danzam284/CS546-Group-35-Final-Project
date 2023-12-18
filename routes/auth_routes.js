//import express, express router as shown in lecture code
import {Router} from 'express';
import * as helpers from '../helpers.js';
import { registerUser, loginUser } from '../data/users.js';
import { users, courses, professors } from '../config/mongoCollections.js';
import { addCourse } from '../data/course.js';
import { addProfessor } from '../data/professor.js';
import { ObjectId } from 'mongodb';
import xss from 'xss';

const router = Router();

let courseMessages = {};

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
    let emailAddress = xss(req.body.emailAddressInput);
    let username = xss(req.body.usernameInput);
    let password = xss(req.body.passwordInput);
    let confirmedPassword = xss(req.body.confirmPasswordInput);
    try {
      emailAddress = emailAddress.trim(); helpers.validateEmailStevens(emailAddress);
      username = username.trim(); helpers.validateUsername(username);
      password = password.trim(); helpers.validatePassword(password);
      confirmedPassword = confirmedPassword.trim(); helpers.validatePassword(confirmedPassword);
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
    res.render('../views/login', {title: "Login"});
  })
  .post(async (req, res) => {
    let emailAddress = xss(req.body.emailAddressInput);
    let password = xss(req.body.passwordInput);
    try {
      emailAddress = emailAddress.trim(); helpers.validateEmail(emailAddress);
      password = password.trim(); helpers.validatePassword(password);
      req.session.user = await loginUser(emailAddress, password);
      res.redirect("/home");
    } catch(e) {
      res.status(400).render("../views/login", {error: e, title: "Login"});
    }
  });

router
.route('/home/')
.get(async (req, res) => {
  const user = req.session.user;
  res.render('../views/home', {title: "home", username: user.username, email: user.emailAddress, admin: user.admin});
});

router
.route('/home/:message')
.get(async (req, res) => {
  const message = xss(req.params.message);
  const user = req.session.user;
  res.render('../views/home', {title: "home", username: user.username, email: user.emailAddress, admin: user.admin, message: message});
});

router
  .route('/create')
  .get(async (req, res) => {
    const courseCollection = await courses();
    const professorCollection = await professors();
    const allCourses = await courseCollection.find({}).toArray();
    const allProfessors = await professorCollection.find({}).toArray();
    res.render('../views/create', {title: "Create Review", courses: allCourses, professors: allProfessors});
  })
  .post(async (req, res) => {
    const user = req.session.user;
    let courseName = xss(req.body.courseNameInput);
    let professorName = xss(req.body.professorNameInput);
    const rating = parseInt(xss(req.body.ratingInput));
    const difficulty = parseInt(xss(req.body.difficultyInput));
    let reviewText = xss(req.body.reviewTextInput);
    courseName = courseName.trim();
    professorName = professorName.trim();
    reviewText = reviewText.trim();
    try {
      helpers.validateCourseName(courseName);
      helpers.validateName(professorName);

      if (rating < 1 || rating > 5) throw "Invalid rating";
      if (difficulty < 1 || difficulty > 5) throw "Invalid difficulty";

      if (typeof reviewText !== 'string') throw 'Review text cannot be empty';
      if (reviewText.trim().length === 0) throw 'Review text cannot be filled with just spaces';

      const userCollection = await users();
      const courseCollection = await courses();
      const professorCollection = await professors();

      const checkCourse = await courseCollection.findOne({name: courseName});
      if (!checkCourse) throw "Course does not exist, please add it first before reviewing it.";
      const checkProfessor = await professorCollection.findOne({name: professorName});
      if (!checkProfessor) throw "Professor does not exist, please add them first before reviewing them.";

      const currentUser = await userCollection.findOne({_id: new ObjectId(user._id)});
      for (let i = 0; i < currentUser.reviews.length; i++) {
        const rev = currentUser.reviews[i];
        if (rev.professorName === professorName && rev.courseName === courseName) {
          throw "You already made a review for this course and professor!";
        }
      }

      const newReviewId = new ObjectId();
      const newReview = {
        _id: newReviewId,
        professorId: checkProfessor._id,
        professorName: professorName,
        courseId: checkCourse._id,
        courseName: courseName,
        reviewBody: reviewText,
        rating: rating,
        difficulty: difficulty,
        date: new Date().toDateString(), 
        reports: []
      };
      
      const updatedUser = await userCollection.updateOne({_id: new ObjectId(user._id)}, {$push: {reviews: newReview}});
      if (updatedUser.modifiedCount === 0) {
        throw "Internal Server Error";
      }

      const selectedCourse = await courseCollection.findOne({name: courseName});
      const selectedProfessor = await professorCollection.findOne({name: professorName});
      let newCourseAvgRating = Math.round((((selectedCourse.averageRating * selectedCourse.reviewIds.length) + rating) / (selectedCourse.reviewIds.length + 1)) * 100) / 100;
      let newCourseAvgDiff = Math.round((((selectedCourse.averageDifficulty * selectedCourse.reviewIds.length) + difficulty) / (selectedCourse.reviewIds.length + 1)) * 100) / 100;
      const containsProf = await courseCollection.findOne({name: courseName, professorIds: selectedProfessor._id});
      let updatedCourse;
      if (!containsProf) {
        updatedCourse = await courseCollection.updateOne({name: courseName}, {$push: {professorIds: selectedProfessor._id, reviewIds: newReviewId}, $set: {averageRating: newCourseAvgRating, averageDifficulty: newCourseAvgDiff}});
      } else {
        updatedCourse = await courseCollection.updateOne({name: courseName}, {$push: {reviewIds: newReviewId}, $set: {averageRating: newCourseAvgRating, averageDifficulty: newCourseAvgDiff}});
      }
      if (updatedCourse.modifiedCount === 0) {
        throw "Internal Server Error";
      }
      
      let newProfessorAvgRating = Math.round((((selectedProfessor.averageRating * selectedProfessor.reviewIds.length) + rating) / (selectedProfessor.reviewIds.length + 1)) * 100) / 100;
      let newProfessorAvgDiff = Math.round((((selectedProfessor.averageDifficulty * selectedProfessor.reviewIds.length) + difficulty) / (selectedProfessor.reviewIds.length + 1)) * 100) / 100;
      const containsCourse = await professorCollection.findOne({name: professorName, courseIds: selectedCourse._id});
      let updatedProfessor;
      if (!containsCourse) {
        updatedProfessor = await professorCollection.updateOne({name: professorName}, {$push: {courseIds: selectedCourse._id, reviewIds: newReviewId}, $set: {averageRating: newProfessorAvgRating, averageDifficulty: newProfessorAvgDiff}});
      } else {  
        updatedProfessor = await professorCollection.updateOne({name: professorName}, {$push: {reviewIds: newReviewId}, $set: {averageRating: newProfessorAvgRating, averageDifficulty: newProfessorAvgDiff}});
      }
      if (updatedProfessor.modifiedCount === 0) {
        throw "Internal Server Error";
      }
      console.log("Review successfully added to user, course, and professor.")

      return res.redirect("/home/Review successfully added!");
    } catch(error) {
      console.log(error);
      const courseCollection = await courses();
      const professorCollection = await professors();
      const allCourses = await courseCollection.find({}).toArray();
      const allProfessors = await professorCollection.find({}).toArray();
      return res.status(400).render('../views/create', {title: "Create Review", courses: allCourses, professors: allProfessors, error: error});
    }
    
  });

router
  .route('/delete')
  .get(async (req, res) => {
    try {
      let user = req.session.user;
      const userCollection = await users();

      const currentUser = await userCollection.findOne({_id: new ObjectId(user._id)});
      const allReviews = currentUser.reviews;
      if (allReviews.length === 0) throw "You have no reviews to delete";

      res.render('../views/delete', {title: "Delete Review", reviews: allReviews});
    } catch (error) {
      return res.render("../views/delete", {error: error, title: "Delete Review"});
    }
  });
router
  .route('/delete/:reviewId')
  .delete(async (req, res) => {
    try {
      const reviewId = xss(req.params.reviewId);
      let userId = req.session.user._id;

      const userCollection = await users();
      const courseCollection = await courses();
      const professorCollection = await professors();
      
      //If deleter is an admin, finds user whose post is being deleted
      if (req.session.user.admin) {
        let found = false;
        const allUsers = await userCollection.find({}).toArray();
        for (let i = 0; i < allUsers.length; i++) {
          for (let j = 0; j < allUsers[i].reviews.length; j++) {
            if (allUsers[i].reviews[j]._id.equals(new ObjectId(reviewId))) {
              found = true;
              userId = allUsers[i]._id;
              break;
            }
          }
          if (found) {
            break;
          }
        }
        if (!found) {
          throw "Post could not be found.";
        }
      }

      //check incase user gets to delete route somehow without using the delete page
      const currentUser = await userCollection.findOne({_id: new ObjectId(userId)});
      let allReviews = currentUser.reviews;
      if (allReviews.length === 0) throw "You have no reviews to delete aaa";

      if (!ObjectId.isValid(reviewId)) throw "Invalid review ID";
      const selectedReview = allReviews.find((review) => review._id.equals(new ObjectId(reviewId)));
      if (!selectedReview) throw "Review not found";
      const courseId = selectedReview.courseId;
      const professorId = selectedReview.professorId;
      const reviewRating = selectedReview.rating;
      const reviewDifficulty = selectedReview.difficulty;

      allReviews = allReviews.filter((review) => !review._id.equals(new ObjectId(reviewId)));
      const updatedUser = await userCollection.updateOne({_id: new ObjectId(userId)}, {$set: {reviews: allReviews}});
      if (updatedUser.modifiedCount === 0) throw "Internal Server Error";

      //Removing the reviewId from course and professor and updating their average rating/difficulty
      const selectedCourse = await courseCollection.findOne({_id: courseId});
      const selectedProfessor = await professorCollection.findOne({_id: professorId});

      let newCourseAvgRating, newCourseAvgDiff, newProfessorAvgRating, newProfessorAvgDiff;
      if (selectedCourse.reviewIds.length === 1) {
        newCourseAvgRating = 0;
        newCourseAvgDiff = 0;
      } else {
        newCourseAvgRating = Math.round((((selectedCourse.averageRating * selectedCourse.reviewIds.length) - reviewRating) / (selectedCourse.reviewIds.length - 1)) * 100) / 100;
        newCourseAvgDiff = Math.round((((selectedCourse.averageDifficulty * selectedCourse.reviewIds.length) - reviewDifficulty) / (selectedCourse.reviewIds.length - 1)) * 100) / 100;
      }
      if (selectedProfessor.reviewIds.length === 1) {
        newProfessorAvgRating = 0;
        newProfessorAvgDiff = 0;
      } else {
        newProfessorAvgRating = Math.round((((selectedProfessor.averageRating * selectedProfessor.reviewIds.length) - reviewRating) / (selectedProfessor.reviewIds.length - 1)) * 100) / 100;
        newProfessorAvgDiff = Math.round((((selectedProfessor.averageDifficulty * selectedProfessor.reviewIds.length) - reviewDifficulty) / (selectedProfessor.reviewIds.length - 1)) * 100) / 100;
      }
      
      //check if this course and professor have any other reviews together and remove them from each other if they do not
      const getUpdatedUser = await userCollection.findOne({_id: new ObjectId(userId)});
      const newReviewArray = getUpdatedUser.reviews;
      const check = newReviewArray.filter((review) => review.courseId.equals(new ObjectId(courseId)) && review.professorId.equals(new ObjectId(professorId)));
      let updatedCourse, updatedProfessor;
      updatedCourse = await courseCollection.updateOne({_id: courseId}, {$set: {averageRating: newCourseAvgRating, averageDifficulty: newCourseAvgDiff}, $pull: {reviewIds: new ObjectId(reviewId)}});
      if (updatedCourse.modifiedCount === 0) throw "Internal Server Error";
      updatedProfessor = await professorCollection.updateOne({_id: professorId}, {$set: {averageRating: newProfessorAvgRating, averageDifficulty: newProfessorAvgDiff}, $pull: {reviewIds: new ObjectId(reviewId)}});
      if (updatedProfessor.modifiedCount === 0) throw "Internal Server Error";
      //if (check.length !== 0) {
      //  updatedCourse = await courseCollection.updateOne({_id: courseId}, {$set: {averageRating: newCourseAvgRating, averageDifficulty: newCourseAvgDiff}, $pull: {reviewIds: new ObjectId(reviewId)}});
      //  if (updatedCourse.modifiedCount === 0) throw "Internal Server Error";
      //  updatedProfessor = await professorCollection.updateOne({_id: professorId}, {$set: {averageRating: newProfessorAvgRating, averageDifficulty: newProfessorAvgDiff}, $pull: {reviewIds: new ObjectId(reviewId)}});
      //  if (updatedProfessor.modifiedCount === 0) throw "Internal Server Error";
      //} else {
      //  updatedCourse = await courseCollection.updateOne({_id: courseId}, {$set: {averageRating: newCourseAvgRating, averageDifficulty: newCourseAvgDiff}, $pull: {professorIds: professorId, reviewIds: new ObjectId(reviewId)}});
      //  if (updatedCourse.modifiedCount === 0) throw "Internal Server Error";
      //  updatedProfessor = await professorCollection.updateOne({_id: professorId}, {$set: {averageRating: newProfessorAvgRating, averageDifficulty: newProfessorAvgDiff}, $pull: {courseIds: courseId, reviewIds: new ObjectId(reviewId)}});
      //  if (updatedProfessor.modifiedCount === 0) throw "Internal Server Error";
      //}
      console.log('Successfully deleted review!!');

      return res.redirect("/home/Successfully deleted review!");
    } catch(e) {
      console.log(e);
      return res.status(400).render("../views/delete", {error: e, title: "Delete Review"});
    }
  });

router
  .route('/addCourse')
  .get(async (req, res) => {
    res.render('../views/addCourse', {title: "add course"});
  })
  .post(async (req, res) => {
    let courseName = xss(req.body.courseNameInput);
    try {
      courseName = courseName.trim(); helpers.validateCourseName(courseName);
    } catch(e) {
      return res.status(400).render("../views/addCourse", {error: e, title: "add course"});
    }

    try {
      const add = await addCourse(courseName);
      if (add.insertedCourse) {
        return res.redirect("/home/Successfully added course!");
      } else {
        return res.status(500).render("../views/addCourse", {error: "Internal Server Error", title: "Add course"});
      }
    } catch(e) {
      return res.status(400).render("../views/addCourse", {error: e, title: "Add course"});
    }
  });

  router
  .route('/addProfessor')
  .get(async (req, res) => {
    res.render('../views/addProfessor', {title: "Add professor"});
  })
  .post(async (req, res) => {
    let professorFirstName = xss(req.body.professorFirstNameInput);
    let professorLastName = xss(req.body.professorLastNameInput);
    try {
      professorFirstName = professorFirstName.trim(); helpers.validateProfessorName(professorFirstName, "first");
      professorLastName = professorLastName.trim(); helpers.validateProfessorName(professorLastName, "last");
    } catch(e) {
      return res.status(400).render("../views/addProfessor", {error: e, title: "Add professor"});
    }

    try {
      const add = await addProfessor(professorFirstName, professorLastName);
      if (add.insertedCourse) {
        return res.redirect("/home/Successfully added professor!");
      } else {
        return res.status(500).render("../views/addProfessor", {error: "Internal Server Error", title: "Add professor"});
      }
    } catch(e) {
      return res.status(400).render("../views/addProfessor", {error: e, title: "Add professor"});
    }
  });

router
.route('/prof')
  .get(async (req, res) => {
    try {
      const professorCollection = await professors();
      const allProfessors = await professorCollection.find({}).toArray();
      res.render('../views/professorSelect', { title: 'Professor', professors: allProfessors });
    } catch (error) {
      return res.status(400).render("../views/professorSelect", {error: error, title: "Professor"});
    }
  })
  .post(async (req, res) => {
    try {
      const professorName = xss(req.body.professorNameInput).trim();
      const professorCollection = await professors();
      const checkProfessor = await professorCollection.findOne({name: professorName});
      if (!checkProfessor) {
        throw "Professor not found.";
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
      res.render('../views/prof', { title: 'Professor', professorName: professorName, reviews: professorReviews, rating: checkProfessor.averageRating, difficulty: checkProfessor.averageDifficulty });
    } catch (error) {
      return res.status(400).render("../views/professorSelect", {error: error, title: "prof"});
    }
  });

  router
    .route('/chat/:courseName')
    .get((req, res) => {
      const courseName = xss(req.params.courseName);
      const revisedCourseName = courseName.replace(" ", "_");
      if (!courseMessages[courseName]) {
        courseMessages[courseName] = [];
      }
      res.render('chat', { title: 'Chat Window', course: revisedCourseName, messages: courseMessages[courseName] });
    })
    .post((req, res) => {
      const revisedCourseName = xss(req.params.courseName);
      const courseName = revisedCourseName.replace("_", " ");
      if (!courseMessages[courseName]) {
        courseMessages[courseName] = [];
      }
      const message = {
        user: xss(req.session.user.username),
        text: xss(req.body.message),
        timestamp: new Date().toISOString()
      };
      courseMessages[courseName].push(message);
      res.redirect('/chat/' + courseName);
    });

router
.route('/chatSelect')
.get(async (req, res) => {
  try {
    const courseCollection = await courses();
    const allCourses = await courseCollection.find({}).toArray();
    res.render('../views/chatSelect', { title: 'Chat', courses: allCourses });
  } catch (error) {
    return res.status(400).render("../views/chatSelect", {error: error, title: "Chat"});
  }
}
).post(async (req, res) => {
  try {
    const courseName = xss(req.body.courseNameInput).trim();
    const courseCollection = await courses();
    const checkCourse = await courseCollection.findOne({name: courseName});
    if (!checkCourse) {
      throw "Course not found.";
    }
    res.redirect('/chat/' + courseName);
  } catch (error) {
    return res.status(400).render("../views/chatSelect", {error: error, title: "Chat"});
  }
});


router
.route('/course')
.get(async (req, res) => {
  try {
    const courseCollection = await courses();
    const allCourses = await courseCollection.find({}).toArray();
    res.render('../views/courseSelect', { title: 'Courses', courses: allCourses });
  } catch (error) {
    return res.status(400).render("../views/courseSelect", {error: error, title: "Courses"});
  }
}
).post(async (req, res) => {
  try {
    const courseName = xss(req.body.courseNameInput).trim();
    const courseCollection = await courses();
    const checkCourse = await courseCollection.findOne({name: courseName});
    if (!checkCourse) {
      throw "Course not found.";
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
    res.render('../views/course', { title: 'Courses', courseName: courseName, reviews: courseReviews, rating: checkCourse.averageRating, difficulty: checkCourse.averageDifficulty });
  } catch (error) {
    return res.status(400).render("../views/courseSelect", {error: error, title: "Courses"});
  }
});

router
.route('/bestProfessors')
.get(async (req, res) => {
  try {
    const courseCollection = await courses();
    const allCourses = await courseCollection.find({}).toArray();
    res.render('../views/filter', { title: 'Filter Professors', courses: allCourses });
  } catch (error) {
    return res.status(400).render("../views/filter", {error: error, title: "Filter Professors"});
  }
}
).post(async (req, res) => {
  try {
    const courseName = xss(req.body.courseNameInput).trim();
    const filter = xss(req.body.filterByInput).trim();
    if (filter !== "rat" && filter !== "dif") {
      throw "Invalid filter";
    }
    const courseCollection = await courses();
    const checkCourse = await courseCollection.findOne({name: courseName});
    if (!checkCourse) {
      throw "Course not found.";
    }
    const professorCollection = await professors();
    const courseProfessors = [];
    for (let i = 0; i < checkCourse.professorIds.length; i++) {
      const professor = await professorCollection.findOne({_id: checkCourse.professorIds[i]});
      console.log(professor);
      if (professor) {
        courseProfessors.push(professor);
      }
    }

    if (filter === "rat") {
      courseProfessors.sort((a, b) => b.averageRating - a.averageRating);
    } else {
      courseProfessors.sort((a, b) => a.averageDifficulty - b.averageDifficulty);
    }

    res.render('../views/filtered', { title: 'Filtered Professors', courseName: courseName, professors: courseProfessors});
  } catch (error) {
    return res.status(400).render("../views/filtered", {error: error, title: "Filtered Professors"});
  }
});

router
.route('/logout')
.get(async (req, res) => {
  req.session.destroy();
  res.render('../views/login', {title: "Login"});
});

router
.get('/report-review/:id', async (req, res) => {
  const reviewId = xss(req.params.id);

  try {
      res.render('../views/reportReview', { reviewId, title: "Report Review" });
  } 
  catch (error) {
      return res.status(500).render("../views/reportReview", {error: "Internal Server Error", title: "Report Review"});
  }
});

router
.post('/report-review/:id', async (req, res) => {
  const reviewId = xss(req.params.id);
  const explanation = xss(req.body.explanation);

  try {
    const userCollection = await users();
    const user = await userCollection.findOne({'reviews._id': new ObjectId(reviewId)});

    //Makes sure you cannot report your own post.
    if (user._id.equals(new ObjectId(req.session.user._id))) {
      throw "You cannot report your own post";
    }

    //Makes sure post has not already been reported
    for (let i = 0; i < user.reviews.length; i++) {
      if (user.reviews[i]._id.equals(new ObjectId(reviewId))) {
        for (let j = 0; j < user.reviews[i].reports.length; j++) {
          if (user.reviews[i].reports[j].reported === req.session.user._id) {
            throw "You have already reported this post.";
          }
        }
        break;
      }
    }

    const report = {reported: req.session.user._id, reason: explanation};
    await userCollection.updateOne(
      { 'reviews._id': new ObjectId(reviewId) },
      { $push: { 'reviews.$.reports': report} }
    );

    return res.redirect(`/home/Successfully reported post!`);
  } catch (error) {
    return res.status(400).render("../views/reportReview", { error: error, title: "Report Review" });
  }
});

router.get('/admin', async (req, res) => {
  try {
    const userCollection = await users();
    const allUsers = await userCollection.find({}).toArray();
    const allReviews = [];
    for (let i = 0; i < allUsers.length; i++) {
      for (let j = 0; j < allUsers[i].reviews.length; j++) {
        allReviews.push(allUsers[i].reviews[j]);
      }
    }
    allReviews.sort((a, b) => b.reports.length - a.reports.length);
    res.render('../views/admin', { title: 'Admin', reviews: allReviews });
  } catch (error) {
    return res.status(400).render("../views/home", {error: error, title: "Home"});
  }
});

router.get('/checkProfessor/:professor', async (req, res) => {
  const professorName = xss(req.params.professor.trim());
  const split = professorName.split(" ");
  const professorCollection = await professors();
  try {
    helpers.validateProfessorName(split[0], "first");
    helpers.validateProfessorName(split[1], "last");
    const prof = await professorCollection.findOne({name: professorName});
    res.send(prof);
  } catch(e) {
    res.send({error: e});
  }
});

export default router;