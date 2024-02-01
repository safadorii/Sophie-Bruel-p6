document.addEventListener("DOMContentLoaded", async function () {
  // Récupération des Travaux
  fetch("http://localhost:5678/api/works") 
  .then(function(response) {
    if(response.ok) {
      return response.json();
    }
  })
  fetch("http://localhost:5678/api/categories") 
.then(function(response) {
	if(response.ok) {
		return response.json();
	}
})
const erreurMessage = document.querySelector(".erreur-message");
const loginBtn = document.querySelector(".connecter");
 

loginBtn.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = event.target.email.value
    const password = event.target.password.value

    const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Ajoute les informations d'identification 
    body: JSON.stringify({ email, password }),
  });
  if (response.ok) {
    const data = await response.json();
    window.localStorage.setItem("token", data.token);
    window.location.href = "./index.html"
  } else {
    erreurMessage.style.visibility = "visible";
}
});
});
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



