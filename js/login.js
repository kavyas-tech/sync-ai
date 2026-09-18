/* =========================================
   SYNC AI - LOGIN JAVASCRIPT
========================================= */


/* =========================================
   PASSWORD SHOW / HIDE
========================================= */

const passwordInput =
    document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.textContent = "Hide";

        togglePassword.setAttribute(
            "aria-label",
            "Hide password"
        );

    } else {

        passwordInput.type = "password";

        togglePassword.textContent = "Show";

        togglePassword.setAttribute(
            "aria-label",
            "Show password"
        );

    }

});



/* =========================================
   LOGIN FORM
========================================= */

const loginForm =
    document.getElementById("loginForm");


loginForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const rememberMe =
        document.getElementById("rememberMe").checked;


    /* Basic validation */

    if (email === "") {

        alert("Please enter your college email.");

        return;
    }


    if (password === "") {

        alert("Please enter your password.");

        return;
    }


    /* Save prototype login information */

    localStorage.setItem(
        "syncAI_loggedIn",
        "true"
    );

    localStorage.setItem(
        "syncAI_email",
        email
    );


    if (rememberMe) {

        localStorage.setItem(
            "syncAI_rememberMe",
            "true"
        );

    } else {

        localStorage.removeItem(
            "syncAI_rememberMe"
        );

    }


    /*
        TEMPORARY FLOW

        Signup page will be created in Step 2.

        So after login we redirect to signup.html.
    */

    window.location.href =
        "signup.html";

});



/* =========================================
   CREATE ACCOUNT
========================================= */

const createAccountBtn =
    document.getElementById(
        "createAccountBtn"
    );


createAccountBtn.addEventListener(
    "click",
    function () {

        window.location.href =
            "signup.html";

    }
);



/* =========================================
   FORGOT PASSWORD
========================================= */

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


forgotPassword.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        alert(
            "Password recovery will be added in the next step."
        );

    }
);
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Login successful
    localStorage.setItem("syncAI_loggedIn", "true");

    // Go directly to Dashboard
    window.location.href = "dashboard.html";
});