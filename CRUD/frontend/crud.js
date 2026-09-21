/* =========================
   DEFAULT USERS
========================= */

let users =
    JSON.parse(
        localStorage.getItem("crudUsers")
    ) || [

        {
            id: 1,
            name: "John Smith",
            email: "john@example.com",
            type: "Job Seeker"
        },

        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@example.com",
            type: "Job Seeker"
        },

        {
            id: 3,
            name: "ABC Technologies",
            email: "info@abc.co.za",
            type: "Company"
        }

    ];


/* =========================
   SAVE USERS
========================= */

function saveUsers() {

    localStorage.setItem(
        "crudUsers",
        JSON.stringify(users)
    );

}


/* =========================
   INITIAL LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadUsers();

        showSection("readSection");

    }
);


/* =========================
   CREATE
========================= */

document
    .getElementById("createForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("createName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("createEmail")
                    .value
                    .trim();

            const type =
                document
                    .getElementById("createType")
                    .value;


            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                type: type

            };


            users.push(newUser);

            saveUsers();

            loadUsers();


            document
                .getElementById("createForm")
                .reset();


            alert(
                "User created successfully!"
            );


            showUsers();

        }
    );


/* =========================
   READ
========================= */

function loadUsers() {

    const container =
        document.getElementById(
            "usersContainer"
        );


    container.innerHTML = "";


    if (users.length === 0) {

        container.innerHTML =
            "<p>No users found.</p>";

        return;

    }


    users.forEach(user => {

        const card =
            document.createElement("div");

        card.className =
            "user-card";


        card.innerHTML = `

            <div class="user-avatar">
                ${getInitials(user.name)}
            </div>

            <div class="user-details">

                <h3>
                    ${escapeHTML(user.name)}
                </h3>

                <p>
                    ${escapeHTML(user.email)}
                </p>

            </div>

            <span class="account-type">
                ${escapeHTML(user.type)}
            </span>

        `;


        container.appendChild(card);

    });


    loadUpdateUsers();

    loadDeleteUsers();

}


/* =========================
   UPDATE LIST
========================= */

function loadUpdateUsers() {

    const container =
        document.getElementById(
            "updateList"
        );


    container.innerHTML = "";


    users.forEach(user => {

        const row =
            document.createElement("div");

        row.className =
            "action-row";


        row.innerHTML = `

            <div class="user-avatar">
                ${getInitials(user.name)}
            </div>

            <div class="user-details">

                <h3>
                    ${escapeHTML(user.name)}
                </h3>

                <p>
                    ${escapeHTML(user.email)}
                </p>

            </div>

            <button
                class="edit-button"
                onclick="openUpdateModal(${user.id})">

                Edit

            </button>

        `;


        container.appendChild(row);

    });

}


/* =========================
   OPEN UPDATE MODAL
========================= */

function openUpdateModal(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    document
        .getElementById("updateId")
        .value = user.id;


    document
        .getElementById("updateName")
        .value = user.name;


    document
        .getElementById("updateEmail")
        .value = user.email;


    document
        .getElementById("updateType")
        .value = user.type;


    document
        .getElementById("updateModal")
        .classList.add("active");

}


/* =========================
   UPDATE USER
========================= */

document
    .getElementById("updateForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                Number(
                    document
                        .getElementById("updateId")
                        .value
                );


            const user =
                users.find(
                    user => user.id === id
                );


            if (!user) return;


            user.name =
                document
                    .getElementById("updateName")
                    .value
                    .trim();


            user.email =
                document
                    .getElementById("updateEmail")
                    .value
                    .trim();


            user.type =
                document
                    .getElementById("updateType")
                    .value;


            saveUsers();

            loadUsers();

            closeUpdateModal();


            alert(
                "User updated successfully!"
            );

        }
    );


/* =========================
   CLOSE MODAL
========================= */

function closeUpdateModal() {

    document
        .getElementById("updateModal")
        .classList.remove("active");

}


/* =========================
   DELETE LIST
========================= */

function loadDeleteUsers() {

    const container =
        document.getElementById(
            "deleteList"
        );


    container.innerHTML = "";


    users.forEach(user => {

        const row =
            document.createElement("div");

        row.className =
            "action-row";


        row.innerHTML = `

            <div class="user-avatar">
                ${getInitials(user.name)}
            </div>

            <div class="user-details">

                <h3>
                    ${escapeHTML(user.name)}
                </h3>

                <p>
                    ${escapeHTML(user.email)}
                </p>

            </div>

            <button
                class="delete-button"
                onclick="deleteUser(${user.id})">

                Delete

            </button>

        `;


        container.appendChild(row);

    });

}


/* =========================
   DELETE USER
========================= */

function deleteUser(id) {

    const user =
        users.find(
            user => user.id === id
        );


    if (!user) return;


    const confirmed =
        confirm(
            `Delete ${user.name}?`
        );


    if (!confirmed) return;


    users =
        users.filter(
            user => user.id !== id
        );


    saveUsers();

    loadUsers();

    alert(
        "User deleted successfully!"
    );

}


/* =========================
   SEARCH
========================= */

function searchUsers() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();


    const cards =
        document.querySelectorAll(
            "#usersContainer .user-card"
        );


    cards.forEach(
        (card, index) => {

            const user =
                users[index];


            if (
                user.name
                    .toLowerCase()
                    .includes(search) ||

                user.email
                    .toLowerCase()
                    .includes(search)
            ) {

                card.style.display =
                    "flex";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================
   SHOW CREATE
========================= */

function showCreateForm() {

    showSection(
        "createSection"
    );

}


/* =========================
   SHOW READ
========================= */

function showUsers() {

    loadUsers();

    showSection(
        "readSection"
    );

}


/* =========================
   SHOW UPDATE
========================= */

function showUpdateForm() {

    loadUpdateUsers();

    showSection(
        "updateSection"
    );

}


/* =========================
   SHOW DELETE
========================= */

function showDeleteForm() {

    loadDeleteUsers();

    showSection(
        "deleteSection"
    );

}


/* =========================
   SECTION DISPLAY
========================= */

function showSection(id) {

    const sections =
        document.querySelectorAll(
            ".crud-section"
        );


    sections.forEach(
        section => {

            section.style.display =
                "none";

        }
    );


    document
        .getElementById(id)
        .style.display = "block";

}


/* =========================
   INITIALS
========================= */

function getInitials(name) {

    const words =
        name.split(" ");


    if (words.length >= 2) {

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase();

    }


    return name
        .substring(0, 2)
        .toUpperCase();

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}