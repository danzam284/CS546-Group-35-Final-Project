document.addEventListener('DOMContentLoaded', function () {
    let registerForm = document.getElementById('registration-form');
    let loginForm = document.getElementById('login-form');

    if (registerForm) {
    
      registerForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const emailAddressInput = document.getElementById('emailAddressInput').value;
        const passwordInput = document.getElementById('passwordInput').value;
        const confirmPasswordInput = document.getElementById('confirmPasswordInput').value;
      
        // email input validation
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

        if (!validEmail.test(emailAddressInput)) { //check for all the valid email stuff above
            document.getElementById("error") = "Please enter a valid email address.";
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

        if (!validEmail.test(emailAddressInput)) { //check for all the valid email stuff above
            document.getElementById("error").innerHTML = "Please enter a valid Stevens Email Address. (Must contain @stevens.edu)";
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(passwordInput)) {
          document.getElementById("error").innerHTML = "Please enter a valid Stevens Email Address. (Must contain @stevens.edu)";
        }
        loginForm.submit();
        
      });
    }
});

(function ($) {
  let form = $("#professorExists")
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
            response.html("Yes, " + firstName + " " + lastName + " is in our database! So far " + data.reviewIds.length + " people have rated them and they have an average rating of " + data.averageRating + ".");
          } else {
            response.html("No, " + firstName + " " + lastName + " is not in our database. Feel free to go to 'Add Professor' to add them!");
          }
        }
      })
    });
  }
})(window.jQuery);