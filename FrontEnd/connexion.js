//ecran de connexion
let contactForm = document.getElementById('logInForm');

async function callLogin (logInBody){
    console.log("appel à /users/login " + JSON.stringify(logInBody))
}

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


function validateField(field){
    if(field.checkValidity()){
        return true;
    } else {
        field.classlist.add('invalid')
        field.previousElementSibling.insertAdjacentHTML('beforeend', `<span class=msg>${field.validationMessage}</span`)
        return false;
        }
        }

function resetField(field){
    let fieldLabel =  field.previousElementSibling; 
    field.classlist.remove('invalid')
    while(fieldLabel.firstElementChild){
        fieldLabel.removeChild(fieldLabel.firstElementChild);
    }
    field.valid = true;
}