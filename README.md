# **RateMyStevens**


## **Team Members**

Lauren Kibalo, Harris Pyo, Jason Vera, Daniel Zamloot, Dean Zazzera


## **Introduction**

For this project, we plan to implement a web application that allows users (Stevens students) to review professors after taking their course! Participants will be able to review the professor and future students will be able to obtain an accurate representation of course requirements/expectations. 


## **Core Features**



1. Main Page: A sign in page 
2. User-Login Page: Allow users to sign in, but posts are anonymous.
3. Search for Professor: Search for a professor by professor name.
4. Search for Class/Course: Search for a course by course name.
5. Make a review / post Page: Create a review on a professor or course.
6. Delete a post: users can delete a post they made
7. User account: Accounts can be created with username/password
8. Add a professor: Add a professor to the database to be rated
9. Add a class/course: Add a course to the database
10. Filter professors by rating for each course
11. Admin login to edit posts, discussions, and reviews on website
12. Report a post and allow admins to view reported posts


## **Extra Features**



1. Discussion area for each class
2. Filter professors by rating (different from core feature 10 because is a general search, not dependent upon course)
3. Stevens student verification (check if email contains stevens.edu and use email validation API to ensure it exists).


## **GitHub**

[https://github.com/danzam284/CS546-Group-35-Final-Project](https://github.com/danzam284/CS546-Group-35-Final-Project)

## How to run
- Our repository link is: https://github.com/danzam284/CS546-Group-35-Final-Project
- Clone or download the repository code
- To seed the database, run 'npm run seed'
- To install dependencies, run 'npm i'
- To start, run 'npm start'
- Finally, open localhost:3000

## Accounts
- We have supplied 3 accounts in the seed.
- Feel free to use these accounts or create your own.
    - email: dzamloot@stevens.edu, password: Password123!
    - email: jbonetti@stevens.edu, password: Password123!
    - email: admin@stevens.edu, password: Password123!
- Note: in order to test the admin functionality, you must sign into the admin account.

## Our extra features
- We implemented the Discussion area which can be found in the 'chat with classmates' link
- We implemented the filter professor by rating which can be found in the 'find best professor' link
- We implemented the Stevens student verification which can be seen when attempting to create a non-Stevens account

## Other notes
- For core feature 2, we spoke to professor and he said it was ok if we do not make it anonymous and just function as a log in page
- For core feature 11, we also spoke to professor and he said it was ok to just have Admins able to delete posts
- Thank you!
