const form = document.forms["user"];
const errorDiv = document.getElementById("formErrors");

const emailRegex = /(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/; //RFC 5322 compliant, source: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
const nameRegex = /^[Α-Ω][Α-Ω- ]*$/;
const passwdRegexes = [
    /[A-Z]+/,
    /[a-z]+/,
    /[0-9]+/,
    /[!@#$%^&*]+/
];
const passwdMinimumLength = 8;

const emailInput = document.getElementById("email");
const fnameInput = document.getElementById("fname");
const lnameInput = document.getElementById("lname");
const passwdInput = document.getElementById("passwd");
const passwdConfirmInput = document.getElementById("passwd_confirm");

emailInput.addEventListener("keyup", function (event) {
    validateEMail();
});

fnameInput.addEventListener("keyup", function (event) {
    validateFirstName();
});

lnameInput.addEventListener("keyup", function (event) {
    validateLastName();
});

passwdInput.addEventListener("keyup", function (event) {
    validatePassword();
});

passwdConfirmInput.addEventListener("keyup", function (event) {
    checkPasswordsMatching();
});

//TODO: Το error message έχει γίνει πολύ μπακαλίστικα αυτή τη στιγμή, πρέπει να βελτιωθεί

function validateEMail() {
    let email = form["email"].value;
    if (!emailRegex.test(email)) {
        errorDiv.textContent = "Λάθος e-mail";
    } else {
        errorDiv.textContent = "Σωστό e-mail";
    }
    //TODO: Έλεγχος για διπλότυπα
}

function validateFirstName() {
    let fname = form["fname"].value;
    if (!nameRegex.test(fname)) {
        errorDiv.textContent = "Λάθος όνομα.";
    } else {
        errorDiv.textContent = "Όλα σωστά!";
    }
}

function validateLastName() {
    let lname = form["lname"].value;
    if (!nameRegex.test(lname)) {
        errorDiv.textContent = "Λάθος επώνυμο.";
    } else {
        errorDiv.textContent = "Όλα σωστά!";
    }
}

function validatePassword() {
    let passwd = form["passwd"].value;
    let passwdValid = true;
    for (regex of passwdRegexes) {
        if (!regex.test(passwd)) passwdValid = false;
    }
    if (passwd.length < passwdMinimumLength) {
        errorDiv.textContent = "Ο κωδικός πρέπει να είναι τουλάχιστον 8 χαρακτήρες.";
        return;
    }
    if (passwdValid == false) {
        errorDiv.textContent = "Λάθος κωδικός";
    } else {
        errorDiv.textContent = "Σωστός κωδικός";
    }
    checkPasswordsMatching();
}

function checkPasswordsMatching() {
    let passwd = form["passwd"].value;
    let passwdConfirm = form["passwd_confirm"].value;
    if (passwd == passwdConfirm) {
        errorDiv.textContent = "Οι κωδικοί ταιριάζουν";
    } else {
        errorDiv.textContent = "Οι κωδικοί δεν ταιριάζουν";
    }
}

function showPassword() {
    let x = document.getElementById("passwd");
    let y = document.getElementById("passwd_confirm");
    if (x.type === "password"){
        x.type = "text";
        y.type = "text";
    } else {
        x.type ="password";
        y.type ="password";
    }
}