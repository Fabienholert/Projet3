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
    filtresContainer.innerHTML='';
}};

modeModif();




//création de la modale//
let buttonModifier = document.querySelector(".motModifier");
buttonModifier.addEventListener("click",function() {
const createModale = document.createElement("div")
const buttonCroix = document.createElement("button");
const modaleGallerie = document.createElement("H2");
const modaleImage = document.createElement("div");
const creationLigne = document.createElement("hr");
const modaleAjout = document.createElement("button");
createModale.appendChild(modalecontainer)
});
