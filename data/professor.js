import {professors} from '../config/mongoCollections.js';
import * as helpers from '../helpers.js';

export const addProfessor = async (firstName, lastName) => {
    firstName = firstName.trim().toLowerCase();
    firstName = firstName[0].toUpperCase() + firstName.substring(1);
    helpers.validateProfessorName(firstName, "first");
    lastName = lastName.trim().toLowerCase();
    helpers.validateProfessorName(lastName, "last");
    lastName = lastName[0].toUpperCase() + lastName.substring(1);

    const professorName = firstName + " " + lastName;

    const professorCollection = await professors();
    const professorsWithName = await professorCollection.findOne({'name': professorName});
    if (professorsWithName) {
        throw "A professor already exists with this name.";
    }

    const newProfessor = {name: professorName, averageRating: 0, averageDifficulty: 0, reviewIds: [], courseIds: []};
    const insertInfo = await professorCollection.insertOne(newProfessor);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not add professor.";
    }

    return {insertedCourse: true};
}