//ecran de connexion
let contactForm = document.getElementById('logInForm');
  
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
let email = document.getElementById('Email');
let password = document.getElementById('motDePasse');
let logInBody = {
    "email": email.value,
    "password": password.value
  };


 fetch ("http://localhost:5678/api/users/login", {     
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logInBody),
    }).then(response => {
    if (response.status === 200) { 
        return response.json();
        } else {
            alert("Veuillez saisir un Email et Mot de Passe valide !");
        }
    }).then(data => {

            const {userId, token } = data;

        window.localStorage.setItem("token", token);

        window.location.href="index.html";
    }).catch(error => {
    console.error("Erreur lors de la requête :", error);

});

});
