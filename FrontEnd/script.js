document.addEventListener("DOMContentLoaded", async function () {
	const filterContainer = document.querySelector('.filters');
  
	// Récupération des Travaux
	const responseWorks = await fetch('http://localhost:5678/api/works');
	const works = await responseWorks.json();
	genererWorks(works);
  
	// Récupération des catégories
	const responseCategories = await fetch('http://localhost:5678/api/categories');
	const categories = await responseCategories.json();
	genererFiltres(categories);
  
	// Filtrage initial, montrant toutes les travaux
	filtrerParCategorie('tousGategorie');
  
	// Ajout d'événements aux boutons de filtre
	filterContainer.addEventListener('click', function (event) {
	  const target = event.target;
	  
		const filterValue = target.getAttribute('data-filter');
		filtrerParCategorie(filterValue);
	  
	});
  });
  
  function genererWorks(works) {
	const sectionGallery = document.querySelector(".gallery");
  
	works.forEach(article => {
	  const workElement = document.createElement("figure");
	  const imageElement = document.createElement("img");
	  imageElement.src = article.imageUrl;
  
	  const nomElement = document.createElement("figcaption");
	  nomElement.innerText = article.title;
  
	  workElement.appendChild(imageElement);
	  workElement.appendChild(nomElement);
  
	  // Ajoute la catégorie de l'œuvre comme attribut de données
	  workElement.setAttribute('data-category', article.categoryId);
  
	  sectionGallery.appendChild(workElement);
	});
  }
  
  function genererFiltres(categories) {
	const filterContainer = document.querySelector('.filters');
  
	// Ajoute un bouton "Tous"
	const allButton = document.createElement('button');
	allButton.classList.add('filter__btn', 'filter__btn--active');
	allButton.setAttribute('data-filter', 'tousGategorie');
	allButton.textContent = 'Tous';
	filterContainer.appendChild(allButton);
  
	// Ajoute des boutons pour chaque catégorie
	categories.forEach(category => {
	  const button = document.createElement('button');
	  button.classList.add('filter__btn',`filter__btn-id-${category.id}`);
	  button.setAttribute('data-filter',category.id);
	  button.textContent = category.name;
	  filterContainer.appendChild(button);
	});
  }
  
  function filtrerParCategorie(categorieId) {
	const filterButtons = document.querySelectorAll('.filter__btn');
	const galleryFigure = document.querySelectorAll('.gallery figure');
  
    	// Réinitialise la classe active
	filterButtons.forEach(btn => btn.classList.remove('filter__btn--active'));
  
	// Active le bouton correspondant à la catégorie sélectionnée
	const activeButton = categorieId === 'tousGategorie' ? document.querySelector('.filter__btn') : document.querySelector(`.filter__btn-id-${categorieId}`);
	activeButton.classList.add('filter__btn--active');
  
	// Afficheou masque les éléments en fonction du filtre
	galleryFigure.forEach(photo => {
	  const itemCategory = photo.getAttribute('data-category');
	  if (categorieId === 'tousGategorie' || itemCategory === categorieId) {
		photo.style.display = 'block';
	  } else {
		photo.style.display = 'none';
	  }
	});
  }
  // mode connecté //

const Login = document.querySelector(".login");
const Logout = document.querySelector(".logout");
const token = window.localStorage.getItem("token");
const edition = document.querySelector(".edition");
const filtres = document.querySelector(".filters");
const modification = document.querySelector(".modification");

function EditMode() {
  Logout.classList.remove("inactive");
  Login.classList.add("inactive");
  edition.classList.remove("inactive");
  filtres.classList.add("inactive");
  modification.classList.remove("visibilite");
  
}

function removeEditMode() {
  window.localStorage.removeItem("token");
  Logout.classList.add("inactive");
  Login.classList.remove("inactive");
  edition.classList.add("inactive");
  filtres.classList.remove("inactive");
  modification.classList.add("visibilite")
}

if (token !== null) {
  EditMode();
  Logout.addEventListener("click", removeEditMode);  

}