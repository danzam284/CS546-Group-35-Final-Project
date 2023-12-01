import {courses} from '../config/mongoCollections.js';
import * as helpers from '../helpers.js';

export const addCourse = async (courseName) => {
    courseName = courseName.trim();
    helpers.validateCourseName(courseName);
    courseName = courseName.toUpperCase();

    const courseCollection = await courses();
    const coursesWithName = await courseCollection.findOne({'name': courseName});
    if (coursesWithName) {
        throw Error("A course already exists with this name.");
    }

    const newCourse = {name: courseName, averageRating: 0, averageDifficulty: 0, reviewIds: [], professorIds: []};
    const insertInfo = await courseCollection.insertOne(newCourse);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw Error("Could not add course.");
    }

    return {insertedCourse: true};
}