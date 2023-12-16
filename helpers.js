import validator from 'email-validator';

function validateString(str) {
    if (!str || typeof str !== 'string') {
        throw "Value is not a string.";
    }
    if (str.trim() == "") {
        throw "String is either empty or only has spaces.";
    }
}

function validateEmail(str) {
    validateString(str);
    if (!validator.validate(str)) {
        throw "Invalid email.";
    }
}

function validateEmailStevens(str) {
    validateString(str);
    if (!validator.validate(str)) {
        throw "Invalid email.";
    }
    if (!str.endsWith('@stevens.edu')) {
        throw "Email must be a Stevens Email.";
    }
}

const validCharacters = "abcdefghijklmnopqrstuvwxyz-'";
function validateName(n) {
    validateString(n);

    if (n.length < 2 || n.length > 25) {
        throw "Invalid name length";
    }
    for (let i = 0; i < n; i++) {
        if (!validCharacters.includes(n[i]) && !validCharacters.toUpperCase().includes(n[i])) {
            throw "Name is not valid.";
        }
    }
}

const specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
const numbers = "1234567890";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function validatePassword(p) {
    validateString(p);
    if (p.length < 8) {
        throw "Password must be longer.";
    }
    let spe = false, num = false, upp = false;
    for (let i = 0; i < p.length; i++) {
        if (p[i] === " ") {
            throw "Password must not contain spaces.";
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
        throw "Password does not meet requirements.";
    }
}

function validateUsername(u) {
    validateString(u);
    if (u.length < 3) {
        throw "Username must be longer.";
    }
    if (u.length > 15) {
        throw "Username is too long.";
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
        throw "Invalid course name format.";
    }
    if (!validPrefixes.includes(spl[0].trim().toUpperCase())) {
        throw "Invalid course prefix.";
    }
    if (isNaN(spl[1].trim())) {
        throw "Non-number detected for course number.";
    }
    const courseNumber = parseInt(spl[1].trim());
    if (courseNumber < 100 || courseNumber > 900) {
        throw "Course number must be between 100 and 900.";
    }
}

function validateProfessorName(n, type) {
    validateString(n);
    if (n.length < 2) {
        throw type + " name is too short.";
    }
    if (n.length > 25) {
        throw type + " name is too long.";
    }
    for (let i = 0; i < n.length; i++) {
        if (!(/[a-zA-Z]/).test(n[i]) && n[i] !== "'") {
            throw type + " name has an invalid character.";
        }
    }
    if (n.split("'").length > 2) {
        throw "Too many apostrophes in " + type + " name.";
    }
}

export {
    validateString,
    validateEmail,
    validateEmailStevens,
    validateName,
    validatePassword,
    validateUsername,
    validateCourseName,
    validateProfessorName
};