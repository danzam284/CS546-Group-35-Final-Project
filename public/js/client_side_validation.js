document.addEventListener('DOMContentLoaded', function () {
    let registerForm = document.getElementById('registration-form');
    let loginForm = document.getElementById('login-form');
    let createForm = document.getElementById('create-form');
    let courseForm = document.getElementById('course-form');
    let professorForm = document.getElementById('professor-form');

    if (registerForm) {
      registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailAddressInput = document.getElementById('emailAddressInput').value;
        const passwordInput = document.getElementById('passwordInput').value;
        const confirmPasswordInput = document.getElementById('confirmPasswordInput').value;
      
        // email input validation
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        if (!validEmail.test(emailAddressInput) || !emailAddressInput.includes('@stevens.edu')) { //check for all the valid email stuff above
            document.getElementById("error").innerHTML = "Please enter a valid Stevens email address (Must contain @stevens.edu).";
            return;
        }

        if (!emailAddressInput.endsWith('@stevens.edu')) {
          document.getElementById("error").innerHTML = "Email must be a Stevens Email.";
          return;
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(passwordInput)) {
          document.getElementById("error").innerHTML = "Please enter a valid password";
          return;
        }

        if (!validPassword.test(confirmPasswordInput)) {
          document.getElementById("error").innerHTML = "Please enter a valid password";
          return;
        }

        if (passwordInput !== confirmPasswordInput) {
          document.getElementById("error").innerHTML = "Passwords must match";
          return;
        }

        registerForm.submit();

      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        let emailAddressInput = document.getElementById('emailAddressInput').value;
        let passwordInput = document.getElementById('passwordInput').value;
        
        // email input validation
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        
        if (!validEmail.test(emailAddressInput) || !emailAddressInput.includes('@stevens.edu')) { //check for all the valid email stuff above
            document.getElementById("error").innerHTML = "Please enter a valid Stevens Email Address (Must contain @stevens.edu).";
            return;
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(passwordInput)) {
          document.getElementById("error").innerHTML = "Please enter a valid password.";
          return;
        }
        loginForm.submit();
        
      });
    }

    if (createForm) {
      createForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let courseNameInput = document.getElementById('courseNameInput').value;
        let reviewInput = document.getElementById('reviewTextInput').value;
        let ratingInput = document.getElementById('ratingInput').value;
        let difficultyInput = document.getElementById('difficultyInput').value;
        let professorNameInput = document.getElementById('professorNameInput').value;

        courseNameInput = courseNameInput.trim();
        if (typeof courseNameInput !== 'string' || courseNameInput.trim().length === 0 || !courseNameInput) {
          document.getElementById("error").innerHTML = "Please enter a valid course name.";
          return;
        }

        if (isNaN(parseInt(ratingInput)) || parseInt(ratingInput) < 1 || parseInt(ratingInput) > 5) {
          document.getElementById("error").innerHTML = "Please enter a valid rating.";
          return;
        } 

        if (isNaN(parseInt(difficultyInput)) || parseInt(difficultyInput) < 1 || parseInt(difficultyInput) > 5) {
          document.getElementById("error").innerHTML = "Please enter a valid difficulty.";
          return;
        }

        reviewInput = reviewInput.trim();
        if (typeof reviewInput !== 'string' || reviewInput.trim().length === 0) {
          document.getElementById("error").innerHTML = "Please enter a valid review.";
          return;
        }

        professorNameInput = professorNameInput.trim();
        if (typeof professorNameInput !== 'string' || professorNameInput.length === 0 || !professorNameInput) {
          document.getElementById("error").innerHTML = "Please enter a valid professor name.";
          return;
        }
        createForm.submit();
      });
    }

    if (courseForm) {
      courseForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let courseNameInput = document.getElementById('courseNameInput').value;
        const validPrefixes = ["AAI", "ACC", "BIA", "BIO", "BME", "BT", "CAL", "CE", "CH", "CHE", "CM", "CPE", "CS", "DS", "ECON", "EE", "ELC", "EM", "EN", "ENGR", "FA", "FE", "FIN", "HAR", "HMU", "HSS", "HST", "IDE", "ISE", "MA", "ME", "MGT", "MIS", "MT", "NANO", "NE", "NIS", "OE", "PEP"];
        courseNameInput = courseNameInput.trim();

        if (typeof courseNameInput !== 'string' || courseNameInput.trim().length === 0 || !courseNameInput) {
          document.getElementById("error").innerHTML = "Please enter a valid course name.";
          return;
        }

        const spl = courseNameInput.split(" ");
        if (spl.length !== 2) {
            document.getElementById("error").innerHTML = "Invalid course name format.";
            return;
        }
        if (!validPrefixes.includes(spl[0].trim().toUpperCase())) {
            document.getElementById("error").innerHTML = "Invalid course prefix.";
            return;
        }
        if (isNaN(spl[1].trim())) {
            document.getElementById("error").innerHTML = "Non-number detected for course number.";
            return;
        }
        const courseNumber = parseInt(spl[1].trim());
        if (courseNumber < 100 || courseNumber > 900) {
            document.getElementById("error").innerHTML = "Course number must be between 100 and 900.";
            return;
        }

        courseForm.submit();
      });
    }

    if (professorForm) {
      professorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let professorFirstNameInput = document.getElementById('professorFirstNameInput').value;
        let professorLastNameInput = document.getElementById('professorLastNameInput').value;
        professorFirstNameInput = professorFirstNameInput.trim();
        professorLastNameInput = professorLastNameInput.trim();


        if (typeof professorFirstNameInput !== 'string' || professorFirstNameInput.length === 0 || !professorFirstNameInput || professorFirstNameInput.indexOf(" ") >= 0) {
          document.getElementById("error").innerHTML = "Please enter a valid first name for the professor.";
          return;
        }

        if (typeof professorLastNameInput !== 'string' || professorLastNameInput.length === 0 || !professorLastNameInput || professorLastNameInput.indexOf(" ") >= 0) {
          document.getElementById("error").innerHTML = "Please enter a valid last name for the professor.";
          return;
        }

        if (professorFirstNameInput.length < 2 || professorFirstNameInput.length > 25) {
          document.getElementById("error").innerHTML = "First name needs to be between 2-25 charcters long.";
          return;
        }

        if (professorLastNameInput.length < 2 || professorLastNameInput.length > 25) {
          document.getElementById("error").innerHTML = "Last name needs to be between 2-25 charcters long.";
          return;
        }

        for (let i = 0; i < professorFirstNameInput.length; i++) {
          if (!(/[a-zA-Z]/).test(professorFirstNameInput[i]) && professorFirstNameInput[i] !== "'") {
              document.getElementById("error").innerHTML = "First name has an invalid character.";
              return;
          }
        }

        for (let i = 0; i < professorLastNameInput.length; i++) {
          if (!(/[a-zA-Z]/).test(professorLastNameInput[i]) && professorLastNameInput[i] !== "'") {
              document.getElementById("error").innerHTML = "Last name has an invalid character.";
              return;
          }
        }

        if (professorFirstNameInput.split("'").length > 2) {
          document.getElementById("error").innerHTML = "Too many apostrophes for the inputted first name.";
          return;
        }

        if (professorLastNameInput.split("'").length > 2) {
          document.getElementById("error").innerHTML = "Too many apostrophes for the inputted entered last name.";
          return;
        }

        professorForm.submit();
      });
    }

});

(function ($) {
  let form = $('#professorExists')
  if (form) {
    form.submit(function (event) {
      event.preventDefault();
      const profName = document.getElementById("professorName").value.trim();
      const split = profName.split(" ");
      const error = $("#error");
      const response = $("#existResponse");
      response.empty();
      error.empty();
      if (split.length !== 2) {
        error.html("Professor name is not valid");
        return;
      }
      let firstName = split[0], lastName = split[1];
      if (firstName.length < 2 || firstName.length > 25) {
        error.html("First name is not valid");
        return;
      }
      if (lastName.length < 2 || lastName.length > 25) {
        error.html("Last name is not valid");
        return;
      }
      firstName = firstName[0].toUpperCase() + firstName.substring(1);
      lastName = lastName[0].toUpperCase() + lastName.substring(1);

      $.ajax({
        method: 'GET',
        url: '/checkProfessor/' + firstName + " " + lastName,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        contentType: 'application/json',
        data: {},
        success: function(data) {
          console.log(data);
          if (data.error) {
            error.html(data.error);
          } else if (data.name) {
            response.html("Yes, " + firstName + " " + lastName + " is in our database! So far " + data.reviewIds.length + " person(s) have rated them and they have an average rating of " + data.averageRating + ".");
          } else {
            response.html("No, " + firstName + " " + lastName + " is not in our database. Feel free to go to 'Add Professor' to add them!");
          }
        }
      })
    });
  }
})(window.jQuery);