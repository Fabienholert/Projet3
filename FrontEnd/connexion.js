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

 fetch ("http://localhost:5678/api/users/login", {     
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logInBody)})
    .then(response => {
    if (response.status === 200) {
        const data = response.json();
        const {userId, token } = data;
        window.localStorage.setItem("userId", userId);
        window.localStorage.setItem("token", token);

        console.log("Connexion réussie !");
        console.log("userId:", userId, "token:", token);

        window.location.href="/FrontEnd/index.html";
    } else {
        alert("Veuillez saisir un Email et Mot de Passe valide !") ;
    }
})
.catch(error => {
    console.error("Erreur lors de la requête :", error);
})});

