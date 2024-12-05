//ecran de connexion
let contactForm = document.querySelector('connexion-main')

let fields = document.querySelectorAll ('input')
let valid = true; 
fields .forEach((field) =>{
    if(!validateField(field)){
        valid = false;
    }
});
if(valid){
    e.target.submit
}


function validateField(field){
    if(field.checkValidity()){
        return true;
    } else {
        return false;
    }
}