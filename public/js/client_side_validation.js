
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
            throw new Error ("please enter a valid email address")
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(passwordInput)) {
            throw new Error('please enter valid password');
        }

        if (!validPassword.test(confirmPasswordInput)) {
            throw new Error('please enter valid password');
        }

        if (passwordInput !== confirmPasswordInput) {
            return new Error ('passwords must match');
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
            throw new Error ("please enter a valid email address")
        }

        // password input validation
        let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

        if (!validPassword.test(passwordInput)) {
            throw new Error('please enter valid password');
        }

        loginForm.submit();
        
      });
    }
  

});