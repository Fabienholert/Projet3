//ecran de connexion
let contactForm = document.querySelector('.connexion-main input');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
let fields = document.querySelectorAll ('input')
fields.forEach((field) =>{resetField});
let valid = true; 
fields .forEach((field) =>{
    if(!validateField(field)){
        valid = false;
    }
});
if(valid){
    e.target.submit
}
}); false;


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