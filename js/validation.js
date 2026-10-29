const form = document.forms["user"];
const errorDiv = document.getElementById("formErrors");

const nameRegex = /^[Α-Ω][Α-Ω- ]*$/;

const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
const passwdInput = document.getElementById("passwd");
const passwdConfirmInput = document.getElementById("passwdConfirm");

fnameInput.addEventListener("keyup", function (event) {
    validateFirstName();
});

lnameInput.addEventListener("keyup", function (event) {
    validateLastName();
});

function validateFirstName() {
    let fname = form["fname"].value;
    if (!nameRegex.test(fname)) {
        errorDiv.textContent = "Λάθος όνομα."
    } else {
        errorDiv.textContent = "Όλα σωστά!"
    }
}

function validateLastName() {
    let lname = form["lname"].value;
    if (!nameRegex.test(lname)) {
        errorDiv.textContent = "Λάθος επώνυμο."
    } else {
        errorDiv.textContent = "Όλα σωστά!"
    }
}