const form = document.forms["user"];

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

var emailValid;
var fnameValid;
var lnameValid;
var passwdValid;
var passwdMatchValid;

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

const errorInfobox = document.getElementById("user_form_infobox");
const emailError = document.getElementById("email_error");
const fnameError = document.getElementById("fname_error");
const lnameError = document.getElementById("lname_error");
const passwdError = document.getElementById("passwd_error");
const passwdMatchError = document.getElementById("passwd_match_error");

const allClearMessage = document.getElementById("all_clear");

const validities = [emailValid, fnameValid, lnameValid, passwdValid, passwdMatchValid];
const individualErrors = [emailError, fnameError, lnameError, passwdError, passwdMatchError]; 

errorInfobox.hidden = true;


function validateEMail() {
    let email = form["email"].value;
    emailRegex.test(email) ? emailValid = true : emailValid = false;
    updateInfobox();
    //TODO: Έλεγχος για διπλότυπα
}

function validateFirstName() {
    let fname = form["fname"].value;
    nameRegex.test(fname) ? fnameValid = true : fnameValid = false;
    updateInfobox();
}

function validateLastName() {
    let lname = form["lname"].value;
    nameRegex.test(lname) ? lnameValid = true : lnameValid = false;
    updateInfobox();
}

function validatePassword() {
    let passwd = form["passwd"].value;
    passwdValid = true;
    for (regex of passwdRegexes) {
        if (!regex.test(passwd)) passwdValid = false;
    }
    if (passwd.length < passwdMinimumLength) {
        passwdValid = false;
    }
    updateInfobox();
    checkPasswordsMatching();
}

function checkPasswordsMatching() {
    let passwd = form["passwd"].value;
    let passwdConfirm = form["passwd_confirm"].value;
    passwd == passwdConfirm ? passwdMatchValid = true : passwdMatchValid = false;
    updateInfobox();
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

function updateInfobox() {
    errorInfobox.hidden = false;
    let allClear = true;
    // for (i = 0; i < validities.length; i++) {
    //     if (!validities[i]) {
    //         individualErrors[i].hidden = false;
    //         allClear = false;
    //     } else {
    //         individualErrors[i].hidden = true;
    //     }
    // }

    if (emailValid) {
        emailError.hidden = true;
    } else {
        emailError.hidden = false;
        allClear = false;
    }

    if (fnameValid) {
        fnameError.hidden = true;
    } else {
        fnameError.hidden = false;
        allClear = false;
    }

    if (lnameValid) {
        lnameError.hidden = true;
    } else {
        lnameError.hidden = false;
        allClear = false;
    }

    if (passwdValid) {
        passwdError.hidden = true;
    } else {
        passwdError.hidden = false;
        allClear = false;
    }

    if (passwdMatchValid) {
        passwdMatchError.hidden = true;
    } else {
        passwdMatchError.hidden = false;
        allClear = false;
    }

    if (allClear) {
        allClearMessage.hidden = false;
        errorInfobox.style.backgroundColor = "rgba(0, 200, 0, 0.7)";
    } else {
        allClearMessage.hidden = true;
        errorInfobox.style.backgroundColor = "rgba(200, 0, 0, 0.7)";
    }
}