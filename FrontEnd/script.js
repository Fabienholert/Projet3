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
        if (!response.ok) {
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
        return false;
    }
    };
    checkToken;

    function modeModif (){
        if (token){
        let modEdition = document.querySelector(".modeEdition");
        modEdition.innerHTML= '<i class="fa-regular fa-pen-to-square"></i> mode édition';
        let filter = document.getElementById('mesProjets');
        let iconeModifie = document.createElement("span");
        let modifierMot = document.createElement("button");
        iconeModifie.className = "fa-regular fa-pen-to-square" ;  
        modifierMot.textContent= " modifier";
        modifierMot.classList.add("motModifier");
        filter.appendChild(iconeModifie);
        filter.appendChild(modifierMot);
        let style = document.createElement("style");
        style.textContent = `
        .modeEdition {
        background-color: black;
        color: white;
        font-size: medium;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        width: 1440px;
        height: 59px;
        gap: 10px; 
        margin-bottom: -20px;
        margin-left: -150px;
    }


    .modeEdition i {
    background-color: black;
    color: white;
    }

    #mesProjets button{
    text-decoration: black;
    border: none;
    background: none;
    size: 14px;
    line-height: 16.42px;
    font-weight: 400;
    }
 
    #mesProjets .fa-regular {
    color: black;
    padding-left: 20px;
    font: 400;
    font-size: medium;
    }
    
    #filtre {
    display: none;
    }`;
    document.head.appendChild(style);
    }};
    modeModif();

    function affichageModale() {
        const buttonModifier = document.querySelector(".motModifier");
        buttonModifier.addEventListener("click", function () {
            // Création des éléments de la modale
            const overlay = document.createElement("div");
            const createModale = document.createElement("div");
            const modaleHeader = document.createElement("div");
            const modaleMain = document.createElement("div");
            const modaleFooter=document.createElement("div");
            const buttonCroix = document.createElement("button");
            const modaleGallerie = document.createElement("h2");
            const modaleContent = document.createElement("div");
            const modaleLigne = document.createElement("hr");
            const modaleAjout = document.createElement("button");
    
            // Ajout des classes et contenus
            overlay.classList.add("overlay");
            modaleHeader.classList.add("modale-header");
            modaleMain.classList.add("modale-main");
            modaleFooter.classList.add("modale-footer")
            createModale.classList.add("modale");
            buttonCroix.className = "fa-solid fa-x";
            modaleGallerie.textContent = "Galerie photo";
            modaleContent.classList.add("modale-content");
            modaleAjout.textContent = "Ajouter une photo";
    
            // visualisation des images dans la modale
            works.forEach((work) => {
                const modaleItem = document.createElement("div");
                modaleItem.classList.add("modale-item");
                
                const img = document.createElement("img");
                img.src = work.imageUrl;
                img.classList.add("modale-img");
    
                const deleteButton = document.createElement("button");
                deleteButton.className = "fa-light fa-trash-can";
                deleteButton.addEventListener("click", () => {
                    if (!work.id) {
                        console.error('Erreur : ID non défini pour le projet', work);
                        return;
                    }
                
                    const deleteUrl = `http://localhost:5678/api/works/${work.id}`;
                    const token = window.localStorage.getItem("token"); // Récupérez le token
                
                    if (!token) {
                        alert('Vous devez être connecté pour effectuer cette action.');
                        return;
                    }
                
                    fetch(deleteUrl, { 
                        method: "DELETE",
                        headers: { 
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}` // Ajoutez le token ici
                        },
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Erreur lors de la suppression : ${response.status}`);
                        }
                        console.log(`Projet avec ID ${work.id} supprimé`);
                        modaleItem.remove(); // Supprime l'élément du DOM
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la suppression :', error);
                    });
                });
                
                modaleItem.appendChild(img);
                modaleItem.appendChild(deleteButton);
                modaleContent.appendChild(modaleItem);
            });
    
            // Construction de la modale
            createModale.appendChild(buttonCroix);
            createModale.appendChild(modaleHeader);
            createModale.appendChild(modaleMain);
            createModale.appendChild(modaleFooter);
            modaleHeader.appendChild(modaleGallerie);
            modaleMain.appendChild(modaleContent);
            modaleFooter.appendChild(modaleLigne);
            modaleFooter.appendChild(modaleAjout);
            document.body.appendChild(overlay);
            document.body.appendChild(createModale);
    
            // Gestion de la fermeture de la modale
            buttonCroix.addEventListener("click", () => {
                document.body.removeChild(overlay);
                document.body.removeChild(createModale);
            });

            modaleAjout.addEventListener("click",function (){
            modaleGallerie.innerHTML="Ajout Photo";
            modaleContent.innerHTML="";
            modaleAjout.innerHTML="valider";
            
            const modaleRectangle = document.createElement("div");
            const iconePhoto = document.createElement("div");
            const buttonPlusAjout = document.createElement("button");
            const textJpg = document.createElement("h4");
            const modaleTitrePage=document.createElement("h3");
            const inputTitre = document.createElement("input");
            const modaleCategoriePage = document.createElement("h3");
            const inputCategorie = document.createElement("select");
            
            modaleRectangle.classList.add("encadreAjoutImage");
            iconePhoto.className="fa-regular fa-image";
            buttonPlusAjout.textContent = " + Ajouter photo ";
            textJpg.textContent=" jpg, png: 4mo max ";
            modaleTitrePage.textContent="Titre";
            inputTitre.classList.add("inputTitre");
            modaleCategoriePage.textContent="Catégorie";
            inputCategorie.classList.add("inputCategorie");

            modaleMain.appendChild(modaleRectangle);
            modaleRectangle.appendChild(iconePhoto);
            modaleRectangle.appendChild(buttonPlusAjout);
            modaleRectangle.appendChild(textJpg);
            modaleMain.appendChild(modaleTitrePage);
            modaleMain.appendChild(inputTitre);
            modaleMain.appendChild(modaleCategoriePage);
            modaleMain.appendChild(inputCategorie);
        

            } )
        });
    }

    affichageModale();



//deleteButton.addEventListener("click", () => {
//    if (!work.id) {
//        console.error('Erreur : ID non défini pour le projet', work);
//        return;
//    }

//    const deleteUrl = `http://localhost:5678/api/works/${work.id}`;
//    const token = window.localStorage.getItem("token"); // Récupérez le token

//    if (!token) {
//        alert('Vous devez être connecté pour effectuer cette action.');
//        return;
//    }

//    fetch(deleteUrl, { 
//        method: "DELETE",
//        headers: { 
//            "Content-Type": "application/json",
//            "Authorization": `Bearer ${token}` // Ajoutez le token ici
//        },
//    })
//    .then((response) => {
//        if (!response.ok) {
//            throw new Error(`Erreur lors de la suppression : ${response.status}`);
//        }
//        console.log(`Projet avec ID ${work.id} supprimé`);
//        modaleItem.remove(); // Supprime l'élément du DOM
//    })
//    .catch((error) => {
//        console.error('Erreur lors de la suppression :', error);
//    });
//});