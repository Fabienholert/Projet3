// ajouter une gallerie photo 
// Sélection du conteneur de la galerie
const galleryContainer = document.getElementById('gallery');
let works = null;

// Fonction pour récupérer les projets via l'API
async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:5678/api/works'); // Appel à l'API
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        works = await response.json(); // Conversion en JSON
        renderGallery(works); // Appeler la fonction pour générer la galerie
    } catch (error) {
        console.error('Erreur :', error);
    }
}

// Fonction pour générer la galerie
function renderGallery(projects,idCategory) {
    galleryContainer.innerHTML = "";
    projects.forEach(project => {
        if(!idCategory || (idCategory && project.categoryId == idCategory)) {

        // Création d'un conteneur pour chaque projet
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        // Création de l'image
        const img = document.createElement('img');
        img.src = project.imageUrl; // URL de l'image depuis l'API
        img.alt = project.title; // Titre ou description depuis l'API

        // Ajout d'une légende (optionnel)
        const caption = document.createElement('p');
        caption.textContent = project.title; // Afficher le titre

        // Ajouter les éléments dans le conteneur
        galleryItem.appendChild(img);
        galleryItem.appendChild(caption);

        // Ajouter le projet à la galerie
        galleryContainer.appendChild(galleryItem);
}
});
}


// Appeler la fonction pour récupérer les projets au chargement de la page
fetchProjects();

// ajouter les filtres

// Sélection de l'élément contenant les filtres
const filtresContainer = document.getElementById('filtre');

// Fonction pour récupérer les projets via l'API

async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:5678/api/categories'); // Appel à l'API
        if (!response.ok, !token.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const categories = await response.json(); // Conversion en JSON
        renderCategory(categories);
    } catch (error) {
        console.error('Erreur :', error);
    }
}
        function renderCategory(categories){
            categories.forEach(categorie => {
            const categorieItem = document.createElement('div');
            categorieItem.classList.add('Categorie-item');
            let button = document.createElement("button");
            button.addEventListener("click",worksFilter);
            button.dataset.id= categorie.id;
            button.textContent = categorie.name;
            categorieItem.appendChild(button);
            filtresContainer.appendChild(categorieItem);   
        })
        }
    fetchCategories();

    function worksFilter (event) {;
        renderGallery(works, event.target.dataset.id);
    }

    // ajouter d'un nouveau bouton 
    let newButton = document.createElement('button');
    newButton.textContent = "Tous";
    newButton.dataset.id = ""; 
    newButton.addEventListener('click', () => {
        renderGallery(works);
    });
    filtresContainer.appendChild(newButton);

// affichage après connexion

    const token = window.localStorage.getItem("token");

function isLogIn () {;
    if (token){
    let logOut = document.getElementById("logIn");
    logOut.innerHTML = "logOut";
    logOut.addEventListener('click', () => {
    window.localStorage.removeItem("token");
    window.location.href="/FrontEnd/index.html";
    })
    }
};
isLogIn();

//verification du token//
 function getPayloadFromToken (token){
    if (!token || typeof token !== 'string') {
        console.error('Token invalide ou non défini');
        return null;
    };
    try {
        const parts = token.split ('.');
        if (parts.length !== 3) {
            throw new error ('Token invalide');
        }
    const payload = atob(parts[1]);
    const payloadObject = JSON.parse(payload);
    return payloadObject;
    } catch (error) {
        console.error('Erreur lors de l’analyse du token :', error);
        return null;
    }

 }
const payload = getPayloadFromToken(token);

if (payload) {}
else {
    console.log('Impossible de récupérer les informations du token.');
};

function checkToken (iat,exp){
    innerHTML
    const differenceInSecond = exp - iat;
    const limitTimeInSecond = 24 * 60 * 60;
    if (differenceInSecond > limitTimeInSecond){
        alert('Votre session a expiré veuillez vous reconnecter!');
        window.localStorage.removeItem("token");
        window.location.Href= 'connexion.html';
        return false
    }
};
checkToken;

function modeModif (){
    if (token){
    let modEdition = document.querySelector(".modeEdition");
    modEdition.innerHTML= '<i class="fa-regular fa-pen-to-square"></i> mode édition';
    let filter = document.getElementById('filtre');
    filter.innerHTML = '<i class="fa-regular fa-pen-to-square"> </i> modifier';
}};

modeModif();