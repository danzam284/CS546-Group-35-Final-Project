
document.addEventListener('DOMContentLoaded', function () {
    let registerForm = document.getElementById('registration-form');
    let loginForm = document.getElementById('login-form');

    if (registerForm) {
    
      registerForm.addEventListener('submit', function (event) {

        event.preventDefault();

        const emailAddress = document.getElementById('emailAddress').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!emailAddress || !password || !confirmPassword) {
            // Display error message for missing fields
            return new Error('fields must not be missing'); 
        }
        
        // email input validation
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

        if (!validEmail.test(emailAddress)) {
            throw new Error ("please enter a valid email address")
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(password)) {
            throw new Error('please enter valid password');
        }

        if (!validPassword.test(confirmPassword)) {
            throw new Error('please enter valid password');
        }

        if (password !== confirmPassword) {
            return new Error ('passwords must match');
        }

        if (!(roleInput === 'admin' || roleInput === 'user')) {
            return new Error('invalid role');
        }

        registerForm.submit();

      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        
        event.preventDefault();

        let emailAddress = document.getElementById('emailAddress').value;
        let password = document.getElementById('password').value;

        
        // email input validation
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

        if (!validEmail.test(emailAddress)) { //check for all the valid email stuff above
            throw new Error ("please enter a valid email address")
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(password)) {
            throw new Error('please enter valid password');
        }

        loginForm.submit();
        
      });
    }
  

});