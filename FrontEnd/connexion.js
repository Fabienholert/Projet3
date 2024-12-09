//ecran de connexion
let contactForm = document.getElementById('logInForm');
  
async function callLogin (logInBody){
    console.log("appel à /users/login " + JSON.stringify(logInBody))
};

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
let email = document.getElementById('Email');
let password = document.getElementById('motDePasse');
let logInBody = {
    "email": email.value,
    "password": password.value
  };
  callLogin (logInBody);
});
