const formBtn = document.querySelector(".formBtn");
const formBg = document.querySelector(".formBg");
const formClose = document.querySelector(".close");
const form = document.querySelector("form")
const closeValidation = document.querySelector(".btn-close");
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const email = document.querySelector("#email")
const message = document.querySelector("#message")
var erreur;

formBtn.addEventListener("click", launchForm);
formClose.addEventListener("click", closeForm);

function launchForm() {
    formBg.classList.add("active")
}

function closeForm() {
    formBg.style.display = "none";
}

form.addEventListener("submit", function (e) {

    const firstName = document.querySelector("#firstName")
    const lastName = document.querySelector("#lastName")
    const email = document.querySelector("#email")
    const message = document.querySelector("#message")
    var erreur;

    if (!message.value) {
        erreur = "Pourquoi nous contactez-vous ?"
    }
    if (!email.value) {
        erreur = "Veuillez entrer votre adresse email"
    }
    if (!lastName.value) {
        erreur = "Veuillez renseigner un nom"
    }
    if (!firstName.value || firstName.value.length < 2) {
        erreur = "Veuillez entrer deux caractères ou plus pour le champ du prénom"
    }

    if (erreur) {
        e.preventDefault();
        document.getElementById("erreur").innerHTML = erreur;
        return false;
    } else {
        alert("Formulaire envoyé !");
    }
});


