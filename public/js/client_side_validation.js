
document.addEventListener('DOMContentLoaded', function () {
    let registerForm = document.getElementById('registration-form');
    let loginForm = document.getElementById('login-form');

    if (registerForm) {
    
        registerForm.addEventListener('submit', function (event) {

        event.preventDefault();

        let emailAddress = document.getElementById('emailAddress').value;
        let username = username.getElementById('username').value;
        let password = document.getElementById('password').value;
  
        emailAddress = emailAddress.trim(); helpers.validateEmail(emailAddress);
        username = username.trim(); helpers.validateUsername(username);
        password = password.trim(); helpers.validatePassword(password);

        registerForm.submit();

      });
    }
  
    if (loginForm) {
      loginForm.addEventListener('submit', function (event) {
        
        event.preventDefault();

        let emailAddress = document.getElementById('emailAddressInput').value;
        let password = document.getElementById('passwordInput').value;

        emailAddress = emailAddress.trim(); helpers.validateEmail(emailAddress);
        password = password.trim(); helpers.validatePassword(password);

        loginForm.submit();
        
      });
    }
  

});