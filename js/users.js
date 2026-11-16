const storageKey = "bookstoreUsers";
const tableBody = document.getElementById("users_table_body");
const emptyMessage = document.getElementById("empty_message");

const users = JSON.parse(localStorage.getItem(storageKey) || "[]");

if (users.length === 0) {
    emptyMessage.hidden = false;
} else {
    users.forEach(function (user) {
        const row = document.createElement("tr");

        addCell(row, user.email);
        addCell(row, user.firstName);
        addCell(row, user.lastName);
        addCell(row, user.role);

        tableBody.appendChild(row);
    });
}

function addCell(row, value) {
    const cell = document.createElement("td");
    cell.textContent = value;
    row.appendChild(cell);
}