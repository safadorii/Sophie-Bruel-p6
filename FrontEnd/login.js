
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

