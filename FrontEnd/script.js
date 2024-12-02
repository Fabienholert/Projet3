// ajouter une gallerie photo 


// Sélection du conteneur de la galerie
const galleryContainer = document.getElementById('gallery');

// Fonction pour récupérer les projets via l'API
async function fetchProjects() {
    try {
        const response = await fetch('http://localhost:5678/api/works'); // Appel à l'API
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const projects = await response.json(); // Conversion en JSON
        renderGallery(projects); // Appeler la fonction pour générer la galerie
    } catch (error) {
        console.error('Erreur :', error);
    }
}

// Fonction pour générer la galerie
function renderGallery(projects) {
    projects.forEach(project => {
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
            const button = document.createElement("button");
            button.textContent = categorie.name;
            categorieItem.appendChild(button);
            filtresContainer.appendChild(categorieItem);   
        })
        }
    fetchCategories();


// ajout du filtre tous //

            let newButton = "Tous"

            let button = document.createElement("button");
            button.innerText = newButton;
            let filter = document.getElementById('filtre');
            filtre.appendChild(button);


// creer les filtres fonctionnels//
// recuperation des Api //

            let menuCategorie = fetch('http://localhost:5678/api/categories') // Remplacez par votre URL d'API
            .then(response => response.json())
            .then(data => {
            console.log(data);
            })
            .catch(error => console.error('Erreur lors de l’appel à l’API :', error))

            let menuImage = fetch('http://localhost:5678/api/works') // Remplacez par votre URL d'API') // Remplacez par votre URL d'API
            .then(response => response.json())
            .then(data => {
            console.log(data);
            })
            .catch(error => console.error('Erreur lors de l’appel à l’API :', error));