/* =========================
   DEFAULT USERS
========================= */

let users = []

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
        async function(event) {

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
            
             const occupation =
                document
                    .getElementById("createOccupation")
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

                occupation: occupation,

                type: type

            };

 try {

        const response = await fetch("http://localhost:5000/jobs", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newUser)
        });

        const data = await response.json()
        .then(data => {
            newUser.id = data._id; // Update the id with the one returned from the backend
            users.push(newUser);
            console.log(users)

        }).then(async () => {

            loadUsers();

            document
                .getElementById("createForm")
                .reset();

            alert(
                        "User created successfully!"
                    );

           // await createUser();

            showUsers();
        })

        //console.log(data._id + " created successfully:");

    } catch (error) {

        console.error("Error:", error);

    }
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

        card.id = user.id;

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
                <p>
                    ${escapeHTML(user.occupation)}
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

                 <p>
                    ${escapeHTML(user.occupation)}
                </p>

            </div>

            <button
                class="edit-button"
                onclick="openUpdateModal('${user.id}')">

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

    console.log("Opening update modal for user:", id);
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
        .getElementById("updateOccupation")
        .value = user.occupation;

    document
        .getElementById("updateType")
        .value = user.type;


    document
        .getElementById("updateModal")
        .classList.add("active");

    console.log("Update modal opened for user1111:", id);

}

/* =========================
   UPDATE USER
========================= */

document
    .getElementById("updateForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const user = users.find(
            user => user.id === myId
        );

        if (!user) {
            alert("User not found!");
            return;
        }

        // Collect the updated form values
        const newData = {
            name: document
                .getElementById("updateName")
                .value
                .trim(),

            email: document
                .getElementById("updateEmail")
                .value
                .trim(),

            occupation: document
                .getElementById("updateOccupation")
                .value
                .trim(),

            userType: document
                .getElementById("updateType")
                .value
        };

        try {

            const response = await fetch(
                `http://localhost:5000/jobs/${myId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(newData)
                }
            );

            // Read the backend response
            const data = await response.json();

            // Check whether the request succeeded
            if (!response.ok) {
                throw new Error(
                    data.message || "Update failed"
                );
            }

            console.log(
                "User updated successfully:",
                data
            );

            // Refresh the displayed records
            await loadUsers();

            // Close the form
            closeUpdateModal();

            // Show success only after the update succeeds
            alert("User updated successfully!");

        } catch (error) {

            console.error(
                "Update failed:",
                error
            );

            alert(
                "Failed to update user: " +
                error.message
            );

        }

    });
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
                <p>
                    ${escapeHTML(user.occupation)}
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

async function deleteUser(id) {

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

    async function deleteUser(id) {
    const user = users.find(
        user => String(user.id) === String(id)
    );

    if (!user) {
        alert("User not found.");
        return;
    }

    const confirmed = confirm(
        `Delete ${user.name}?`
    );

    if (!confirmed) return;

    try {
        const response = await fetch(
            `http://localhost:5000/jobs/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Delete failed"
            );
        }

        users = users.filter(
            user => String(user.id) !== String(id)
        );

        loadUsers();

        alert("User deleted successfully!");

    } catch (error) {
        console.error(
            "Error deleting user:",
            error
        );

        alert("Failed to delete user.");
    }
}
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

const jobForm = document.getElementById("updateForm");