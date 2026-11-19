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

function userSearch() {
    input = document.getElementById("user_search");
    table = document.getElementById("users_table");
    var filter = input.value.toUpperCase();
    var tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            var txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}