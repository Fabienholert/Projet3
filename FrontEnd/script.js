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
    };

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
    window.location.href="/index.html";
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
            throw new Error ('Token invalide');
        }
    const payload = atob(parts[1]);
    const payloadObject = JSON.parse(payload);
    
    if (payloadObject.iat && payloadObject.exp) {
        checkToken(payloadObject.iat, payloadObject.exp);
    } else {
        console.error('Le payload ne contient pas iat ou exp');
    }
    
    return payloadObject;
} catch (error) {
    console.error('Erreur lors de l’analyse du token :', error);
    return null;
}
    function checkToken (iat,exp){
        const currentTime = Math.floor(Date.now() / 1000); // Temps actuel en secondes
        const differenceInSeconds = exp - currentTime;

        if (differenceInSeconds < 0) {
            alert('Votre session a expiré, veuillez vous reconnecter!');
            window.localStorage.removeItem("token");
            window.location.href = "/index.html";
            
        }
        }
 }
const payload = getPayloadFromToken(token);

if (payload) {

}
else {
};
    //fonction modif
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
        if (token) {
            modEdition.classList.add('connected'); // Utilisateur connecté
            filtresContainer.classList.add('connected');
        } else {
            modEdition.classList.add('not-connected'); // Utilisateur non connecté
        }
    }};

    modeModif();

    //affichage de la modale

    function affichageModale() {
        const buttonModifier = document.querySelector(".motModifier");
        buttonModifier.addEventListener("click", function () {
            // Création des éléments de la modale
            const overlay = document.createElement("div");
            const createModale = document.createElement("div");
            // création des élements de la modale de la première vue
            const modaleContent = document.createElement("div");
            const buttonCroix = document.createElement("button");
            const modaleGallerie = document.createElement("h2");
            const vueGallerie = document.createElement("div");
            const modaleLigne = document.createElement("hr");
            const modaleAjout = document.createElement("button");
            // Ajout des classes et contenus
            overlay.classList.add("overlay");
            createModale.classList.add("modale");
            buttonCroix.className = "fa-solid fa-x";
            modaleGallerie.textContent = "Galerie photo";
            modaleContent.classList.add("modale-content");
            vueGallerie.classList.add("vueGallerieModale");
            modaleAjout.textContent = "Ajouter une photo";
            modaleAjout.classList.add("buttonVertAjout");
            // visualisation des images dans la modale
            works.forEach((work) => {
                const modaleItem = document.createElement("div");
                modaleItem.classList.add("modale-item");
                
                const img = document.createElement("img");
                img.src = work.imageUrl;
                img.classList.add("modale-img");
    
                const deleteButton = document.createElement("button");
                deleteButton.className = "fa-light fa-trash-can";
                deleteButton.type="button";
                deleteButton.addEventListener("click", function(event){
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
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Erreur lors de la suppression : ${response.status}`);
                        }

                    
                        alert(`Projet avec ID ${work.id} supprimé`);
                    })
                    .catch((error) => {
                        console.error('Erreur lors de la suppression :', error);
                    });
                });
                
                modaleItem.appendChild(img);
                modaleItem.appendChild(deleteButton);
                vueGallerie.appendChild(modaleItem);
            });
            
    
            // Construction de la modale
            modaleContent.appendChild(buttonCroix);
            modaleContent.appendChild(modaleGallerie);
            createModale.appendChild(modaleContent);            
            modaleContent.appendChild(vueGallerie);
            modaleContent.appendChild(modaleLigne);
            modaleContent.appendChild(modaleAjout);
            document.body.appendChild(overlay);
            document.body.appendChild(createModale);
    
            //créations des éléments de la deuxième vue
            const modaleContentAjout = document.createElement("div");
            const modaleTitreAjout = document.createElement("h2");
            modaleTitreAjout.textContent= "Ajout photo";
            const iconeBack = document.createElement("button");
            const modaleRectangle = document.createElement("div");
            const iconePhoto = document.createElement("div");
            const boutonPlusPhoto = document.createElement("button");
            const inputFile = document.createElement("input");
            const buttonCroixAjout = document.createElement("button");
            inputFile.setAttribute("id", "addFile");
            inputFile.setAttribute("type", "file");
            inputFile.setAttribute("name", "file");
            inputFile.setAttribute("accept", "image/png, image/jpeg");
            const textJpg = document.createElement("h4");
            const formulaireModale = document.createElement("form");
            const modaleTitrePage = document.createElement("h3");
            const inputTitre = document.createElement("input");
            const modaleCategoriePage = document.createElement("h3");
            const inputCategorie = document.createElement("select");
            const modaleLigneAjout = document.createElement("hr");
            const modaleValider = document.createElement("button");
            
            buttonCroixAjout.className="fa-solid fa-x";
            iconeBack.className="fa-solid fa-arrow-left";
            modaleRectangle.classList.add("encadreAjoutImage");
            iconePhoto.className="fa-regular fa-image";
            boutonPlusPhoto.textContent = " + Ajouter photo ";
            inputFile.classList.add ("ajoutPhoto");
            inputFile.innerText=" + Ajouter photo"
            textJpg.textContent=" jpg, png: 4mo max ";
            formulaireModale.classList.add ("formulaireAjout")
            modaleTitrePage.textContent ="Titre";
            inputTitre.classList.add("inputTitre");
            modaleCategoriePage.textContent="Catégorie";
            inputCategorie.classList.add("inputCategorie");
            modaleValider.classList.add("bouton-Valider");
            modaleValider.setAttribute('type', 'submit');
            modaleValider.textContent = "Valider";
            modaleContentAjout.classList.add("modaleContentAjout");
            
            modaleContentAjout.appendChild(iconeBack);
            modaleContentAjout.appendChild(buttonCroixAjout);
            modaleContentAjout.appendChild(modaleTitreAjout);
            modaleContentAjout.appendChild(modaleRectangle);
            modaleRectangle.appendChild(iconePhoto);
            modaleRectangle.appendChild(boutonPlusPhoto);
            boutonPlusPhoto.appendChild(inputFile);
            modaleRectangle.appendChild(textJpg);
            modaleContentAjout.appendChild(formulaireModale)
            formulaireModale.appendChild(modaleTitrePage);
            formulaireModale.appendChild(inputTitre);
            formulaireModale.appendChild(modaleCategoriePage);
            formulaireModale.appendChild(inputCategorie);
            formulaireModale.appendChild(modaleLigneAjout);
            formulaireModale.appendChild(modaleValider);
            createModale.appendChild(modaleContentAjout);

            modaleContentAjout.style.display='none';
            // Gestion de la fermeture de la modale
            buttonCroix.addEventListener("click", () => {
                document.body.removeChild(overlay);
                document.body.removeChild(createModale);
            });

            buttonCroixAjout.addEventListener("click", ()=> {
                document.body.removeChild(overlay);
                document.body.removeChild(createModale);
            });

            overlay.addEventListener("click", () => {
                document.body.removeChild(overlay);
                document.body.removeChild(createModale);
            });
            


            
            
            

            iconeBack.addEventListener("click", function() {
                
            });

            // sélection des catégories dans la modale//
            async function selectionnerCategorie() {
                const defaultOption = document.createElement('option');
                defaultOption.value = "";
                defaultOption.textContent = "Sélectionnez une catégorie"; // Ajoutez un texte d'invite
                inputCategorie.appendChild(defaultOption);
                
                try {
                    const response = await fetch('http://localhost:5678/api/categories');
                    const data = await response.json();
            
                    data.forEach(option => {
                        const opt = document.createElement('option');
                        opt.value = option.id; // Utilisez option.id ici
                        opt.textContent = option.name; // Assurez-vous d'utiliser option.name
                        inputCategorie.appendChild(opt);
                    });
                } catch (error) {
                    console.error('Erreur lors du chargement des options :', error);
                }
            }
            selectionnerCategorie();


            
                // Ajout du gestionnaire pour le bouton "+ Ajouter photo"
                boutonPlusPhoto.addEventListener("click", function() {
                    inputFile.click();
                });
                
                // Gestion de l'input file pour afficher le fichier sélectionné
                inputFile.addEventListener("change", function(event) {
                    const file = event.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                
                        reader.onload = function(e) {
                            const imgPreview = document.createElement("img");
                            imgPreview.src = e.target.result; 
                            imgPreview.classList.add("image-preview");
                            modaleRectangle.innerHTML= "";
                            modaleRectangle.appendChild(imgPreview);
                        };
                        reader.readAsDataURL(file); 
                    }
                });


                //changement de  couleur du bouton Valider //

                function changementButton(categorie, fichier, titre, validateButton) {
                    const isCategorieValid = categorie !== ""; // Vérifie si une catégorie est sélectionnée
                    const isFichierValid = fichier.files && fichier.files.length > 0; // Vérifie si un fichier est sélectionné
                    const isTitreValid = titre.trim() !== ""; // Vérifie que le titre n'est pas vide
                
                    // Activer ou désactiver le bouton en fonction de la validité des champs
                    if (!isCategorieValid || !isFichierValid || !isTitreValid) {
                        validateButton.disabled = true; // Désactiver le bouton
                    } else {
                        validateButton.disabled = false; // Activer le bouton
                    }
                }
                
                // Événements pour les éléments d'entrée
                inputCategorie.addEventListener('change', function() {
                    changementButton(inputCategorie.value, inputFile, inputTitre.value, modaleValider);
                });
                
                inputFile.addEventListener("change", function() {
                    changementButton(inputCategorie.value, inputFile, inputTitre.value, modaleValider);
                });
                
                inputTitre.addEventListener("input", function() {
                    changementButton(inputCategorie.value, inputFile, inputTitre.value, modaleValider);
                });
                
                // Appel initial pour désactiver le bouton au chargement
                changementButton("", inputFile, "", modaleValider);

            
             //ajout de photo par la modale //
                

             modaleValider.addEventListener('click', async (e) => {
                e.preventDefault();
            
                // Vérifier si tous les champs nécessaires sont remplis
                const file = inputFile.files[0]; // Le fichier sélectionné
                const title = inputTitre.value.trim(); // Le titre
                const category = inputCategorie.value; // La catégorie sélectionnée
            
                if (!file || !title || !category) {
                    alert("Veuillez remplir tous les champs et sélectionner une image.");
                    return;
                }
            
                // Préparer les données à envoyer
                const formData = new FormData();
                formData.append("image", file); // Ajouter le fichier
                formData.append("title", title); // Ajouter le titre
                formData.append("category", category); // Ajouter la catégorie
            
                try {
                    const token = window.localStorage.getItem("token"); // Récupérer le token
                    if (!token) {
                        alert("Vous devez être connecté pour effectuer cette action.");
                        return;
                    }
            
                    // Envoyer les données à l'API
                    const response = await fetch("http://localhost:5678/api/works", {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`, // Inclure le token
                        },
                        body: formData, // Utiliser FormData comme corps de la requête
                    });
            
                    if (!response.ok) {
                        throw new Error(`Erreur : ${response.status} - ${response.statusText}`);
                    }
            
                    const result = await response.json(); // Lire la réponse
                    alert("Photo ajoutée avec succès !");
            
                    // Mettre à jour la galerie après l'ajout
                    works.push(result); // Ajouter le nouvel élément à la liste existante
                    renderGallery(works);
            
                    // Fermer la modale après succès
                    document.body.removeChild(document.querySelector(".overlay"));
                    document.body.removeChild(document.querySelector(".modale"));
                } catch (error) {
                    console.error("Erreur lors de l'ajout de la photo :", error);
                    alert("Une erreur s'est produite lors de l'ajout de la photo.");
                }
            });
            
         }) };
    affichageModale();


