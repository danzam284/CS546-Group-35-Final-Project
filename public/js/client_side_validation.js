
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
            document.getElementById("error").innerHTML = "please enter a valid email address";
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(passwordInput)) {
          document.getElementById("error").innerHTML = "please enter a valid password";
        }
        loginForm.submit();
        
      });
    }
});