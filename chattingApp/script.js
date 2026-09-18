
/* =========================
   PASSWORD VISIBILITY
========================= */

function togglePassword(inputId) {

    const input =
        document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";

    } else {

        input.type = "password";

    }
}


/* =========================
   SIGN UP
========================= */

const signupForm =
    document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const firstName =
                document
                    .getElementById("firstName")
                    .value
                    .trim();

            const lastName =
                document
                    .getElementById("lastName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const userType =
                document
                    .getElementById("userType")
                    .value;

            const password =
                document
                    .getElementById("signupPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;

            const message =
                document.getElementById(
                    "signupMessage"
                );


            /* PASSWORD LENGTH */

            if (password.length < 6) {

                showMessage(
                    message,
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            /* PASSWORD MATCH */

            if (password !== confirmPassword) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            /* GET USERS */

            let users =
                JSON.parse(
                    localStorage.getItem(
                        "linkingYouAccounts"
                    )
                ) || [];


            /* CHECK EMAIL */

            const existingUser =
                users.find(
                    user => user.email === email
                );

            if (existingUser) {

                showMessage(
                    message,
                    "An account with this email already exists.",
                    "error"
                );

                return;
            }


            /* CREATE USER */

            const newUser = {

                id: Date.now(),

                firstName: firstName,

                lastName: lastName,

                name:
                    firstName +
                    " " +
                    lastName,

                email: email,

                userType: userType,

                password: password,

                online: true,

                createdAt:
                    new Date().toISOString()

            };


            users.push(newUser);


            localStorage.setItem(
                "linkingYouAccounts",
                JSON.stringify(users)
            );


            showMessage(
                message,
                "Account created successfully! Redirecting...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "login.html";

            }, 1500);

        }
    );

}


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("password")
                    .value;

            const message =
                document.getElementById(
                    "loginMessage"
                );


            const users =
                JSON.parse(
                    localStorage.getItem(
                        "linkingYouAccounts"
                    )
                ) || [];


            const user =
                users.find(
                    account =>
                        account.email === email &&
                        account.password === password
                );


            if (!user) {

                showMessage(
                    message,
                    "Incorrect email or password.",
                    "error"
                );

                return;
            }


            /* SAVE CURRENT USER */

            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );


            showMessage(
                message,
                "Login successful! Redirecting...",
                "success"
            );


            /*
                Change this to your actual
                chat page later.
            */

            setTimeout(() => {

                window.location.href =
                    "chat.html";

            }, 1000);

        }
    );

}


/* =========================
   MESSAGE
========================= */

function showMessage(
    element,
    text,
    type
) {

    element.textContent = text;

    element.className =
        "message " + type;

}


/* =========================
   FORGOT PASSWORD
========================= */

function forgotPassword() {

    alert(
        "Password recovery will be connected to the backend later."
    );

}