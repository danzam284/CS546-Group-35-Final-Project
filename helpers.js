import validator from 'email-validator';

function validateString(str) {
    if (!str || typeof str !== 'string') {
        throw Error("Value is not a string.");
    }
    if (str.trim() == "") {
        throw Error("String is either empty or only has spaces.");
    }
}

function validateEmail(str) {
    validateString(str);
    if (!validator.validate(str)) {
        throw Error("Invalid email.");
    }
}

const validCharacters = "abcdefghijklmnopqrstuvwxyz-'";
function validateName(n) {
    validateString(n);

    if (n.length < 2 || n.length > 25) {
        throw Error("Invalid name length");
    }
    for (let i = 0; i < n; i++) {
        if (!validCharacters.includes(n[i]) && !validCharacters.toUpperCase().includes(n[i])) {
            throw Error("Name is not valid.");
        }
    }
}

const specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const numbers = "1234567890";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function validatePassword(p) {
    validateString(p);
    if (p.length < 8) {
        throw Error("Password must be longer.");
    }
    let spe = false, num = false, upp = false;
    for (let i = 0; i < p.length; i++) {
        if (p[i] === " ") {
            throw Error("Password must not contain spaces.");
        }
        if (specialCharacters.includes(p[i])) {
            spe = true;
        } else if (numbers.includes(p[i])) {
            num = true;
        } else if (uppercase.includes(p[i])) {
            upp = true;
        }
    }
    if (!spe || !num || !upp) {
        throw Error("Password does not meet requirements.");
    }
}

function validateUsername(u) {
    validateString(u);
    if (u.length < 3) {
        throw Error("Username must be longer.");
    }
    if (u.length > 15) {
        throw Error("Username is too long.");
    }
}

const validPrefixes = ["AAI", "ACC", "BIA", "BIO", "BME", "BT", "CAL", "CE", "CH", "CHE", "CM", "CPE", "CS", "DS", "ECON", "EE", "ELC",
"EM", "EN", "ENGR", "FA", "FE", "FIN", "HAR", "HMU", "HSS", "HST", "IDE", "ISE", "MA", "ME", "MGT", "MIS", "MT", "NANO", "NE", "NIS",
"OE", "PEP"];

//Course name must be in format of '{prefix} {number}'
function validateCourseName(n) {
    validateString(n);
    const spl = n.split(" ");
    if (spl.length !== 2) {
        throw Error("Invalid course name format.");
    }
    if (!validPrefixes.includes(spl[0].trim().toUpperCase())) {
        throw Error("Invalid course prefix.");
    }
    if (isNaN(spl[1].trim())) {
        throw Error("Non-number detected for course number.");
    }
    const courseNumber = parseInt(spl[1].trim());
    if (courseNumber < 100 || courseNumber > 900) {
        throw Error("Course number must be between 100 and 900.");
    }
}

export {
    validateString,
    validateEmail,
    validateName,
    validatePassword,
    validateUsername,
    validateCourseName
};