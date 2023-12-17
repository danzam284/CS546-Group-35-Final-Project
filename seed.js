import {users, courses, professors} from './config/mongoCollections.js';
import {dbConnection, closeConnection} from './config/mongoConnection.js';
import { ObjectId } from 'mongodb';

const db = await dbConnection();
await db.dropDatabase();

//Passwords are Password123!
const userCollection = await users();
const courseCollection = await courses();
const professorCollection = await professors();

const seedUsers = [
{
    "_id": new ObjectId("657e207f91bfdd4fa346e488"),
    "emailAddress": "dzamloot@stevens.edu",
    "username": "danzam",
    "password": "$2b$10$AH5eqrZU2T7gMGGI9iNh0u4uTIRkg6f/Utrk8LsdGEKW9hw0xOzyi",
    "admin": false,
    "reviews": [
    {
        "_id": new ObjectId("657e214824dc15b8b05571af"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48a"),
        "professorName": "Patrick Hill",
        "courseId": new ObjectId("657e208091bfdd4fa346e493"),
        "courseName": "CS 554",
        "reviewBody": "This is one of the best courses at Stevens, might as well say the BEST. Be prepared to learn a lot of things, and do not take it if you have no intent to learn. The prof is great and is always ready to help. I would pay just to watch his lectures cuz its that good. Wish there were another one which would make it a trilogy.\r\n",
        "rating": 5,
        "difficulty": 1,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e21c924dc15b8b05571b0"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48a"),
        "professorName": "Patrick Hill",
        "courseId": new ObjectId("657e208091bfdd4fa346e492"),
        "courseName": "CS 546",
        "reviewBody": "Great lectures and I really appreciate his no-nonsense attitude, given it comes along with very fair and reasonable expectations. He sometimes seems not as devoted to this course as he wants his students to be, however, and takes a long time to get project proposals back, stunting progress. Be prepared to start your final without approval.\r\n",
        "rating": 4,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e21f924dc15b8b05571b1"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48b"),
        "professorName": "Shudong Hao",
        "courseId": new ObjectId("657e208091bfdd4fa346e494"),
        "courseName": "CS 382",
        "reviewBody": "This course is extremely challenging, be prepared to read the textbook beforehand, else you are probably going to be really lost. The exams are extremely difficult, you can expect to spend a lot of time doing practice questions on your own if you wish to do well on the exams. For your reference, the course average for most exams are in the 60-70s.\r\n",
        "rating": 3,
        "difficulty": 5,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e233b24dc15b8b05571b2"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48b"),
        "professorName": "Shudong Hao",
        "courseId": new ObjectId("657e208091bfdd4fa346e495"),
        "courseName": "CS 392",
        "reviewBody": "He does not accept any late work no matter what. Lectures are really great and homework assignments are always interesting. In every lecture, he gives out hints on the content of midterms and final. He is very friendly and is impressed by doing hws with recursion.\r\n",
        "rating": 5,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e237224dc15b8b05571b3"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48c"),
        "professorName": "Erisa Terolli",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Considering the nature of the class, I think Terolli was a good teacher! She uses a lot of visual examples and makes the information easy to understand. Homework and Labs come in frequently, as well as pop quizzes, but none felt too overwhelming. She can sometimes lose control of her lectures, but apart from that she makes the content very clear.\r\n",
        "rating": 4,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e23a424dc15b8b05571b4"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48f"),
        "professorName": "Kevin Ryan",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Prof. Ryan has gotten angrier and meaner this year and maybe last. He became irate at our class for not doing well on his test that had nothing to do with class material. He does not know much about how the field has evolved after 1973 and also doesn't know how to turn the projector on. To pass, attend his review sessions and you'll be good.\r\n",
        "rating": 2,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e23be24dc15b8b05571b5"),
        "professorId": new ObjectId("657e208091bfdd4fa346e490"),
        "professorName": "Antonio Nicolosi",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Started with recursion day 1 when I only knew how to print. Professor had heavy accent which was tough to understand. He did not show up to office hours even after I emailed him. Scored 36% on first exam. Score was curved 20 points then rounded in a bell curve. I got a 56% with the curve and then rounded down to a ZERO! Had to drop the class.",
        "rating": 1,
        "difficulty": 5,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e23db24dc15b8b05571b6"),
        "professorId": new ObjectId("657e208091bfdd4fa346e491"),
        "professorName": "Dave Naumann",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Professor Naumann is a good teacher, but he sort of expects you to know the course before coming in. Several times I have asked him questions and his answers haven't been helpful. I often had to figure out stuff myself. However, he teaches well and is very knowledgeable. He is also funny. He taught the course well enough that I currently TA for it.\r\n",
        "rating": 3,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e240024dc15b8b05571b7"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48d"),
        "professorName": "Abrar Alrumayh",
        "courseId": new ObjectId("657e208091bfdd4fa346e497"),
        "courseName": "CS 284",
        "reviewBody": "CS 284 5 3 I must say it was an absolute delight to take CS284 with Professor Alrumayh, she demonstrated a passion for the subject matter. She creates an inclusive and welcoming environment for all students. Their willingness to engage in discussions, answer questions, and provide additional support outside of class. I would highly recommend her to anyone.\r\n",
        "rating": 5,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e242324dc15b8b05571b8"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48e"),
        "professorName": "Philippe Meunier",
        "courseId": new ObjectId("657e208091bfdd4fa346e498"),
        "courseName": "CS 385",
        "reviewBody": "No surprises, everything is clear. very good\r\n",
        "rating": 5,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e244324dc15b8b05571b9"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48e"),
        "professorName": "Philippe Meunier",
        "courseId": new ObjectId("657e208091bfdd4fa346e499"),
        "courseName": "CS 492",
        "reviewBody": "385 and 492. He is awesome. I love him. Extremely smart, hilarious, and helpful outside of class. Engages the class regularly. Makes the content super interesting and is clearly very passionate about the subject. I look forward to the class every day. Super strict with deadlines though. Try it during deener.\r\n",
        "rating": 5,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    }
    ]
},
{
    "_id": new ObjectId("d34d34d34d34d34d34d34d35"),
    "emailAddress": "admin@stevens.edu",
    "username": "admin",
    "password": "$2b$10$svULQWv63eB4X9L7MbKqguZg7pFAbcuJwM600h/32LVFVQxJkNyqa",
    "admin": true,
    "reviews": [
    {
        "_id": new ObjectId("657e24b824dc15b8b05571ba"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48a"),
        "professorName": "Patrick Hill",
        "courseId": new ObjectId("657e208091bfdd4fa346e493"),
        "courseName": "CS 554",
        "reviewBody": "Excellent lecturer with practical hands-on homework and projects. Taught me a majority of the skills I use in my career.\r\n",
        "rating": 5,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e24e024dc15b8b05571bb"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48a"),
        "professorName": "Patrick Hill",
        "courseId": new ObjectId("657e208091bfdd4fa346e492"),
        "courseName": "CS 546",
        "reviewBody": "if i had a choice to have professor Hill teach every class i have taken, i would've taken it immediately. although attendance is not mandatory, you never want to miss any lectures. they almost never get boring and the fast tempo of the class lets quick learners strive in such environment.\r\n",
        "rating": 5,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e24fe24dc15b8b05571bc"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48b"),
        "professorName": "Shudong Hao",
        "courseId": new ObjectId("657e208091bfdd4fa346e494"),
        "courseName": "CS 382",
        "reviewBody": "Professor Hao is a great lecturer but the course had a rough start. It had harsh grading procedures and a lack of rubrics. The first midterm had 75% of the class get below a 60, but the class turned around after the first half. He is a great lecturer and changed a lot over the semester. The class was loads of fun after he changed. High workload!\r\n",
        "rating": 3,
        "difficulty": 5,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e251d24dc15b8b05571bd"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48b"),
        "professorName": "Shudong Hao",
        "courseId": new ObjectId("657e208091bfdd4fa346e495"),
        "courseName": "CS 392",
        "reviewBody": "Shudong is MUCH better in 392, but it's also a better course. He gives you everything you need to do the homework assignments. They all felt fair except for std392io and midterm 2. I enjoyed him and the lectures. If you don't get a 100 on an assignment, no extra credit for it. Very knowledgeable, but still learning how to be a good professor.\r\n",
        "rating": 3,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e254b24dc15b8b05571be"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48c"),
        "professorName": "Erisa Terolli",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "She is a very tough grader and has much more difficult exams/homeworks in comparison to other professors. I don't think Terolli is necessarly a bad professor I just believe that it is signifcantly harder to do well in her course in comparison to others. Trust me I wouldn't be wasting time writing this review if it wasn't true.",
        "rating": 2,
        "difficulty": 2,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e256424dc15b8b05571bf"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48f"),
        "professorName": "Kevin Ryan",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Kevin Ryan is by far the best professor I had at Stevens so far. He was always clear and helpful when teaching CS115, and came in every single day with the same happy attitude and smile to teach. He genuinely cares about every student and their grades, and will help you learn. The course is not hard at all if you are familiar with python.",
        "rating": 5,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e258624dc15b8b05571c0"),
        "professorId": new ObjectId("657e208091bfdd4fa346e490"),
        "professorName": "Antonio Nicolosi",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Do not take this professor if you have no prior CS knowledge. Nicolosi is extremely unorganized and you will need to teach yourself. He did not give a syllabus until the last week of class. His lectures are hard to understand with plenty of rambling. Awful quizzes that do not really test your knowledge of the material. Avoid him at all costs.",
        "rating": 1,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e25a624dc15b8b05571c1"),
        "professorId": new ObjectId("657e208091bfdd4fa346e491"),
        "professorName": "Dave Naumann",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Highly recommended you take up a bit of Python as you can drown from the workload! Functional programming is the core of how the textbook teaches so beware! Honestly he's a down to earth guy. TAs are super helpful. As long as you dedicate time to understand topics and go office hours when needed you'll do great. The weekly HW will improve skills.",
        "rating": 4,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e25c824dc15b8b05571c2"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48d"),
        "professorName": "Abrar Alrumayh",
        "courseId": new ObjectId("657e208091bfdd4fa346e497"),
        "courseName": "CS 284",
        "reviewBody": " Great professor, lenient grader, offered extra credit, was helpful and accessible all semester. Attendance isn't mandatory but there were pop quizzes instead. Lectures did get monotonous at times but overall Dr. Abrar was amazing and definitely one of my better professors this semester. Just make sure to start the homework labs early.",
        "rating": 5,
        "difficulty": 2,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e262a24dc15b8b05571c3"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48e"),
        "professorName": "Philippe Meunier",
        "courseId": new ObjectId("657e208091bfdd4fa346e498"),
        "courseName": "CS 385",
        "reviewBody": "Amazing professor. He taught the class in a very clear and concise manner. Even if you do not enjoy his lectures, he has a bunch of recordings of the previous professor's lectures which are great additions to Philippe's lectures. This course has a lot of assignments, and can be pretty overwhelming when taken in conjunction with CS 382.\r\n",
        "rating": 5,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e264624dc15b8b05571c4"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48e"),
        "professorName": "Philippe Meunier",
        "courseId": new ObjectId("657e208091bfdd4fa346e499"),
        "courseName": "CS 492",
        "reviewBody": "Very theory heavy class, but I thought the content was always well explained and interesting. Meunier pretty much is always available and has office hours anytime he isn't teaching. Only work outside class is 3 hw assignments and a final project. Midterm and final aren't to difficult as long as you pay attention in class.\r\n",
        "rating": 5,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    }
    ]
},
{
    "_id": new ObjectId("657e268724dc15b8b05571c5"),
    "emailAddress": "jbonetti@stevens.edu",
    "username": "bonjovey22",
    "password": "$2b$10$XOi2WUjxeFlIMplzDa52/eOdbvMPPBVWO65OUxt3A.dzrez1q7t9O",
    "admin": false,
    "reviews": [
    {
        "_id": new ObjectId("657e26b424dc15b8b05571c6"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48a"),
        "professorName": "Patrick Hill",
        "courseId": new ObjectId("657e208091bfdd4fa346e492"),
        "courseName": "CS 546",
        "reviewBody": "I found it v hard. I used a lot of PTO to keep up. I was concerned about my grade throughout the whole semester but I ended up doing well. I think the professor does not want to fail his students despite the tough grading. At the end, he was lenient with final grades. 10 lengthy assignments+ major group project. Helpful when needed/ have questions\r\n",
        "rating": 4,
        "difficulty": 5,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e26cc24dc15b8b05571c7"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48b"),
        "professorName": "Shudong Hao",
        "courseId": new ObjectId("657e208091bfdd4fa346e494"),
        "courseName": "CS 382",
        "reviewBody": "He is highly unprofessional. Reading the textbook is a MUST, but it probably wont help you very much on the tests. The homework and the labs do not really relate to what we are learning in class, and honestly some of the assembly ones just feel like busy work. Do not recommend.\r\n",
        "rating": 1,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e26e424dc15b8b05571c8"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48c"),
        "professorName": "Erisa Terolli",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "This is your most important class, you are a cs major. It will be hard. Homework/labs will take hours because they are not clear on how to solve and its okay because you are supposed to learn from these hurdles. The TA are pretty helpful but try not to rely on them for every small problem. Review her material that she posts for every week.",
        "rating": 5,
        "difficulty": 4,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e26f724dc15b8b05571c9"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48f"),
        "professorName": "Kevin Ryan",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "I love Kevin Ryan! He is passionate about what he teaches and always prioritizes the students' needs. He recommends the textbook but you don't need it for the class at all. The homework and exams are easy and if you're new to coding you will survive and thrive in his class. He wants you to attend class and be present -- you will be his favorite.",
        "rating": 5,
        "difficulty": 1,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e270c24dc15b8b05571ca"),
        "professorId": new ObjectId("657e208091bfdd4fa346e490"),
        "professorName": "Antonio Nicolosi",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Very tough grader and with no prior computer science knowledge it is hard to get a good grade",
        "rating": 1,
        "difficulty": 5,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e272d24dc15b8b05571cb"),
        "professorId": new ObjectId("657e208091bfdd4fa346e491"),
        "professorName": "Dave Naumann",
        "courseId": new ObjectId("657e208091bfdd4fa346e496"),
        "courseName": "CS 115",
        "reviewBody": "Very good at teaching cs115. The way he repeats himself reminds me of Khan Academy. You will definitely have an edge if you know programming before, but you should be fine after 2 months into the course without any knowledge beforehand. New programmers will definitely struggle initially. He is accessible through the Piazza website",
        "rating": 4,
        "difficulty": 3,
        "date": "Sat Dec 16 2023",
        "reports": []
    },
    {
        "_id": new ObjectId("657e274824dc15b8b05571cc"),
        "professorId": new ObjectId("657e208091bfdd4fa346e48d"),
        "professorName": "Abrar Alrumayh",
        "courseId": new ObjectId("657e208091bfdd4fa346e497"),
        "courseName": "CS 284",
        "reviewBody": "While I do believe sometimes lectures can be very monotonous, she and her TA's are very generous graders. Especially as someone who wasn't a java wizard, I had no idea how to do the Homeworks, so I would go to my Recitation Ta's office hour every week and it was always just me and him and it was EXTEREMELY helpful. So much EC as well",
        "rating": 5,
        "difficulty": 2,
        "date": "Sat Dec 16 2023",
        "reports": []
    }
    ]
}];

const seedCourses = [{
    "_id": new ObjectId("657e208091bfdd4fa346e492"),
    "name": "CS 546",
    "averageRating": 4.33,
    "averageDifficulty": 4,
    "reviewIds": [
      new ObjectId("657e21c924dc15b8b05571b0"),
      new ObjectId("657e24e024dc15b8b05571bb"),
      new ObjectId("657e26b424dc15b8b05571c6"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48a"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e493"),
    "name": "CS 554",
    "averageRating": 5,
    "averageDifficulty": 2.5,
    "reviewIds": [
      new ObjectId("657e214824dc15b8b05571af"),
      new ObjectId("657e24b824dc15b8b05571ba"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48a"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e494"),
    "name": "CS 382",
    "averageRating": 2.33,
    "averageDifficulty": 4.67,
    "reviewIds": [
      new ObjectId("657e21f924dc15b8b05571b1"),
      new ObjectId("657e24fe24dc15b8b05571bc"),
      new ObjectId("657e26cc24dc15b8b05571c7"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48b"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e495"),
    "name": "CS 392",
    "averageRating": 4,
    "averageDifficulty": 3,
    "reviewIds": [
      new ObjectId("657e233b24dc15b8b05571b2"),
      new ObjectId("657e251d24dc15b8b05571bd"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48b"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e496"),
    "name": "CS 115",
    "averageRating": 3.08,
    "averageDifficulty": 3.33,
    "reviewIds": [
      new ObjectId("657e237224dc15b8b05571b3"),
      new ObjectId("657e23a424dc15b8b05571b4"),
      new ObjectId("657e23be24dc15b8b05571b5"),
      new ObjectId("657e23db24dc15b8b05571b6"),
      new ObjectId("657e254b24dc15b8b05571be"),
      new ObjectId("657e256424dc15b8b05571bf"),
      new ObjectId("657e258624dc15b8b05571c0"),
      new ObjectId("657e25a624dc15b8b05571c1"),
      new ObjectId("657e26e424dc15b8b05571c8"),
      new ObjectId("657e26f724dc15b8b05571c9"),
      new ObjectId("657e270c24dc15b8b05571ca"),
      new ObjectId("657e272d24dc15b8b05571cb"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48c"),
      new ObjectId("657e208091bfdd4fa346e48f"),
      new ObjectId("657e208091bfdd4fa346e490"),
      new ObjectId("657e208091bfdd4fa346e491"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e497"),
    "name": "CS 284",
    "averageRating": 5,
    "averageDifficulty": 2.33,
    "reviewIds": [
      new ObjectId("657e240024dc15b8b05571b7"),
      new ObjectId("657e25c824dc15b8b05571c2"),
      new ObjectId("657e274824dc15b8b05571cc"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48d"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e498"),
    "name": "CS 385",
    "averageRating": 5,
    "averageDifficulty": 3.5,
    "reviewIds": [
      new ObjectId("657e242324dc15b8b05571b8"),
      new ObjectId("657e262a24dc15b8b05571c3"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48e"),
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e499"),
    "name": "CS 492",
    "averageRating": 5,
    "averageDifficulty": 3,
    "reviewIds": [
      new ObjectId("657e244324dc15b8b05571b9"),
      new ObjectId("657e264624dc15b8b05571c4"),
    ],
    "professorIds": [
      new ObjectId("657e208091bfdd4fa346e48e"),
    ]
}];

const seedProfessors = [{
    "_id": new ObjectId("657e208091bfdd4fa346e48a"),
    "name": "Patrick Hill",
    "averageRating": 4.6,
    "averageDifficulty": 3.4,
    "reviewIds": [
      new ObjectId("657e214824dc15b8b05571af"),
      new ObjectId("657e21c924dc15b8b05571b0"),
      new ObjectId("657e24b824dc15b8b05571ba"),
      new ObjectId("657e24e024dc15b8b05571bb"),
      new ObjectId("657e26b424dc15b8b05571c6")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e493"),
      new ObjectId("657e208091bfdd4fa346e492")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e48b"),
    "name": "Shudong Hao",
    "averageRating": 3,
    "averageDifficulty": 4,
    "reviewIds": [
      new ObjectId("657e21f924dc15b8b05571b1"),
      new ObjectId("657e233b24dc15b8b05571b2"),
      new ObjectId("657e24fe24dc15b8b05571bc"),
      new ObjectId("657e251d24dc15b8b05571bd"),
      new ObjectId("657e26cc24dc15b8b05571c7")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e494"),
      new ObjectId("657e208091bfdd4fa346e495")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e48c"),
    "name": "Erisa Terolli",
    "averageRating": 3.67,
    "averageDifficulty": 3,
    "reviewIds": [
      new ObjectId("657e237224dc15b8b05571b3"),
      new ObjectId("657e254b24dc15b8b05571be"),
      new ObjectId("657e26e424dc15b8b05571c8")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e496")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e48d"),
    "name": "Abrar Alrumayh",
    "averageRating": 5,
    "averageDifficulty": 2.33,
    "reviewIds": [
      new ObjectId("657e240024dc15b8b05571b7"),
      new ObjectId("657e25c824dc15b8b05571c2"),
      new ObjectId("657e274824dc15b8b05571cc")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e497")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e48e"),
    "name": "Philippe Meunier",
    "averageRating": 5,
    "averageDifficulty": 3.25,
    "reviewIds": [
      new ObjectId("657e242324dc15b8b05571b8"),
      new ObjectId("657e244324dc15b8b05571b9"),
      new ObjectId("657e262a24dc15b8b05571c3"),
      new ObjectId("657e264624dc15b8b05571c4")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e498"),
      new ObjectId("657e208091bfdd4fa346e499")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e48f"),
    "name": "Kevin Ryan",
    "averageRating": 4,
    "averageDifficulty": 2.33,
    "reviewIds": [
      new ObjectId("657e23a424dc15b8b05571b4"),
      new ObjectId("657e256424dc15b8b05571bf"),
      new ObjectId("657e26f724dc15b8b05571c9")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e496")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e490"),
    "name": "Antonio Nicolosi",
    "averageRating": 1,
    "averageDifficulty": 4.67,
    "reviewIds": [
      new ObjectId("657e23be24dc15b8b05571b5"),
      new ObjectId("657e258624dc15b8b05571c0"),
      new ObjectId("657e270c24dc15b8b05571ca")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e496")
    ]
  },
  {
    "_id": new ObjectId("657e208091bfdd4fa346e491"),
    "name": "Dave Naumann",
    "averageRating": 3.67,
    "averageDifficulty": 3.33,
    "reviewIds": [
      new ObjectId("657e23db24dc15b8b05571b6"),
      new ObjectId("657e25a624dc15b8b05571c1"),
      new ObjectId("657e272d24dc15b8b05571cb")
    ],
    "courseIds": [
      new ObjectId("657e208091bfdd4fa346e496")
    ]
  }]

await userCollection.insertMany(seedUsers);
await courseCollection.insertMany(seedCourses);
await professorCollection.insertMany(seedProfessors);

console.log('Done seeding database');
await closeConnection();