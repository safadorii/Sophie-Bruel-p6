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


 // Ajout d'événements aux boutons modifier
    document.getElementById('modifier-works').addEventListener('click', function(event) {
	event.preventDefault();
      // utiliser fetch pour ajouter tous les travaux dans la modal 
	fetch('http://localhost:5678/api/works')
	.then(function(response) {
		if(response.ok) {
			return response.json();
		}});
		
		document.querySelector('#modal-works.modal-gallery .modal-contenu').innerText = '';
		genererWorksModal(works);

    buttonmodifier=document.getElementById("btn-modifier");
    buttonmodifier.style.display="none";
    modal=document.getElementById('modal');
	modal.style.display= null;
    modalWork=document.getElementById('modal-works');
    modalWork.style.display="block";
	

});


// Ouvrir la deuxieme fenetre du modal avec la button "Ajouter une photo"
document.getElementById('modal-modifier-ajout').addEventListener('click', function(event) {
	event.preventDefault();
	let modalWorks = document.getElementById('modal-works');
	modalWorks.style.display = "none";
	let modalEdit = document.getElementById('modal-modifier');
	modalEdit.style.display = "block";
});

// Creation de l'image preview
document.getElementById('form-image').addEventListener('change', () => {
	let fileInput = document.getElementById('form-image');
	
			
			let myPreviewImage = document.createElement('img');
			myPreviewImage.setAttribute('id','form-image-preview');
			myPreviewImage.src = URL.createObjectURL(fileInput.files[0]);
			document.querySelector('#modal-modifier-new-photo').appendChild(myPreviewImage);
			myPreviewImage.style.display = "block";	
			myPreviewImage.style.height ="169px";
			let iconNewPhoto = document.getElementById('photo-add-icon');
			iconNewPhoto.style.display= "none";
			let buttonNewPhoto = document.getElementById('new-image');
			buttonNewPhoto.style.display= "none";
			let photoMaxSize = document.getElementById('photo-size');
			photoMaxSize.style.display= "none";	
			let modalEditPhoto = document.getElementById('modal-modifier-new-photo');
			modalEditPhoto.style.padding = "0";
		
	
});
// Lier la fonction verifierNewProject() aux image + titre + category en écoutant les événements "input"."
document.getElementById('form-titre').addEventListener('input', verifierNewProject);
document.getElementById('form-category').addEventListener('input',verifierNewProject);
document.getElementById('form-image').addEventListener('input', verifierNewProject);

// Creation la fonction verifierNewProject() pour verifier image + title + category 
function verifierNewProject() {
let title = document.getElementById('form-titre');
let category = document.getElementById('form-category');
let image = document.getElementById('form-image');
let submitWork = document.getElementById('submit-new-work');
if(title.value.trim() === "" || category.value.trim() === "" || image.files.length === 0) {
	submitWork.style.backgroundColor= "#A7A7A7";
} else {
	submitWork.style.backgroundColor= "#1D6154";
}
};

// fermer la deuxieme fenetre du modal avec la button "x"
document.getElementById('bouton-fermer-deuxieme-fenetre').addEventListener('click', function(event) {
	event.preventDefault();
	buttonmodifier=document.getElementById("btn-modifier");
	buttonmodifier.style.display="flex";
	let modal = document.getElementById('modal');
	modal.style.display = "none";
	let modalEdit = document.getElementById('modal-modifier');
	modalEdit.style.display = "none";});
	// fermer la premiere fenetre du modal avec la button "x"
document.getElementById('bouton-fermer-premiere-fenetre').addEventListener('click', function(event) {
	event.preventDefault();
	buttonmodifier=document.getElementById("btn-modifier");
	buttonmodifier.style.display="flex";
	let modal = document.getElementById('modal');
	modal.style.display = "none";
	let modalEdit = document.getElementById('modal-modifier');
	modalEdit.style.display = "none";});
	
// retourner au premier fenetre du modal avec le fleche 
document.getElementById('arrow-return').addEventListener('click', function(event) {
	event.preventDefault();
	let modalWorks = document.getElementById('modal-works');
	modalWorks.style.display = "block";
	let modalEdit = document.getElementById('modal-modifier');
	modalEdit.style.display = "none";});

// utiliser Fetch pour ajouter les options des categories dans la deuxieme fenetre du modal 
	fetch("http://localhost:5678/api/categories")
	.then(function(response) {
		if(response.ok) {
			return response.json();
		}
	})
	.then(function(data) {
		let categories = data;
		categories.forEach((category) => {
		// Creation <options> dans modal modifier
		let myOption = document.createElement('option');
		myOption.setAttribute('value', category.id);
		myOption.textContent = category.name;
		// ajouter la nouvelle option dans select.choice-category
		document.querySelector("select.choice-category").appendChild(myOption);
		});
	})

   


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
  
	  // Ajoute la catégorie de travaux comme attribut de données
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



function genererWorksModal(works) {
    const sectionGallery = document.querySelector(".modal-contenu");

    works.forEach(article => {
        const workElement = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        workElement.appendChild(imageElement);

        // Ajoute la catégorie de travaux comme attribut de données
        workElement.setAttribute('data-id', article.id);
        workElement.setAttribute('data-category', article.categoryId);

        // Creation icon poubelle
        let poubelleIcon = document.createElement('i');
        poubelleIcon.classList.add('fa-solid', 'fa-trash-can', 'trash');
        workElement.appendChild(poubelleIcon);

        poubelleIcon.addEventListener('click', async function (event) {
            event.preventDefault();
            if (confirm("Voulez-vous supprimer cet projet ?")) {
                try {
                    // Fetch pour supprimer la photo dans le modal
                    const deleteResponse = await fetch(`http://localhost:5678/api/works/${article.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
						}
                    });

                    switch (deleteResponse.status) {
                        case 500:
                        case 503:
                            alert("Comportement inattendu!");
                            break;
                        case 401:
                            alert("Suppression impossible!");
                            break;
                        case 200:
                        case 204:
                            console.log("projet supprimée.");
                            // Suppression de la photo du modal
                            workElement.remove();
                            break;
                        default:
                            alert("Erreur inconnue!");
                            break;
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });

        sectionGallery.appendChild(workElement);
    });
}


// Ajouter un événement au bouton "valider" dans la deuxième fenêtre du modal
document.getElementById('submit-new-work').addEventListener('click', async function (event) {
    event.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    const title = document.getElementById('form-titre').value.trim();
    const category = document.getElementById('form-category').value.trim();
    const image = document.getElementById('form-image').files[0];

    

    // Créer un objet FormData pour envoyer les données form-data 
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', image);

    try{
        // Utiliser fetch pour envoyer une requête POST pour ajouter un nouveau projet
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: formData
        });

        if (response.ok) {
            const newWork = await response.json();

            // Générer et ajouter la nouvelle photo dans la deuxième fenêtre du modal
            genererNewWorkModal(newWork);

            // Réinitialiser les champs du formulaire
            document.getElementById('form-titre').value = '';
            document.getElementById('form-category').value = '';
            document.getElementById('form-image').value = '';

            alert('Le nouveau travail a été ajouté avec succès.');
        } else {
            alert('Erreur lors de l\'ajout du nouveau travail.');
        }
    } catch (error) {
        console.error(error);
       
    }
});

function genererNewWorkModal(newWork) {
    const sectionGallery = document.querySelector(".modal-contenu");

    const workElement = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = newWork.imageUrl;
    workElement.appendChild(imageElement);

    // Ajoute la catégorie de travaux comme attribut de données
    workElement.setAttribute('data-id', newWork.id);
    workElement.setAttribute('data-category', newWork.categoryId);

    // Creation icon poubelle
    let poubelleIcon = document.createElement('i');
    poubelleIcon.classList.add('fa-solid', 'fa-trash-can', 'trash');
    workElement.appendChild(poubelleIcon);

    sectionGallery.appendChild(workElement);
}


