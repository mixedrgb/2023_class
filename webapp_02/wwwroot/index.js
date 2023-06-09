function webapp_02() {

    //Get elements

    var textSearch = document.getElementById("text-search");

    var buttonSearch = document.getElementById("button-search");
    var buttonSearchClear = document.getElementById("button-search-clear");

    var employeeTable = document.getElementById("employee-table");

    var buttonInsert = document.getElementById("button-insert");
    var buttonInsertCancel = document.getElementById("button-insert-cancel");

    var buttonDelete = document.getElementById("button-delete");
    var buttonDeleteCancel = document.getElementById("button-delete-cancel");

    var buttonUpdate = document.getElementById("button-update");
    var buttonUpdateCancel = document.getElementById("button-update-cancel");

    //Add event listeners

    buttonSearch.addEventListener("click", searchEmployees);
    buttonSearchClear.addEventListener("click", searchClear);

    buttonInsert.addEventListener("click", insertEmployee);
    buttonInsertCancel.addEventListener("click", insertEmployeeCancel);

    buttonDelete.addEventListener("click", handleButtonDeleteClick);
    buttonDeleteCancel.addEventListener("click", deleteEmployeeCancel);

    buttonUpdate.addEventListener("click", updateEmployee);
    buttonUpdateCancel.addEventListener("click", updateEmployeeCancel);

    //Functions

    function searchEmployees() {

        var url = "http://localhost:5120/SearchEmployees?search=" + textSearch.value;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterSearchEmployees;
        xhr.open("GET", url);
        xhr.send(null);

        function doAfterSearchEmployees() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }

    }

    function showEmployees(employees) {
        var employeeTableText = "<table class='table table-striped table-sm'><thead><tr><th scope='col'>Empoyee ID</th><th scope='col'>First Name</th><th scope='col'>Last Name</th><th scope='col'>Salary</th><th class='button-column'></th></tr></thead><tbody>";

        for (var i = 0; i < employees.length; i++) {
            var employee = employees[i];

            employeeTableText = employeeTableText + "<tr><th scope='row'>" + employee.employeeId + "</th><td>" + employee.firstName + "</td><td>" + employee.lastName + "</td><td>" + employee.salary + "</td><td><div class='row g-2'><div class='col-auto'><button type='button' data-employee-id='" + employee.employeeId + "' class='btn btn-outline-primary btn-sm btn-employee-table-update'>Update</button></div><div class='col-auto'><button id='' type='button' data-employee-id='" + employee.employeeId + "' class='btn btn-outline-primary btn-sm btn-employee-table-delete'>Delete</button></div></div></td></tr>";
        }

        employeeTableText = employeeTableText + "</tbody></table>";

        employeeTable.innerHTML = employeeTableText;

        var updateButtons = document.getElementsByClassName("btn-employee-table-update");

        for (var i = 0; i < updateButtons.length; i++) {
            var updateButton = updateButtons[i];
            updateButton.addEventListener("click", handleEmployeeTableUpdateClick);
        }

        var deleteButtons = document.getElementsByClassName("btn-employee-table-delete");

        for (var i = 0; i < deleteButtons.length; i++) {
            var deleteButton = deleteButtons[i];
            deleteButton.addEventListener("click", handleEmployeeTableDeleteClick);
        }
    }

    function handleEmployeeTableUpdateClick(e) {
        var employeeId = e.target.getAttribute("data-employee-id");
        alert("you want to update employee " + employeeId)
    }

    function handleEmployeeTableDeleteClick(e) {
        var employeeId = e.target.getAttribute("data-employee-id");
        //alert("you want to delete employee " + employeeId)
        deleteEmployee(employeeId);
    }

    function searchClear() {
        textSearch.value = "";
        searchEmployees();
    }

    function insertEmployee() {

        var textFirstName = document.getElementById("text-insert-first-name");
        var textLastName = document.getElementById("text-insert-last-name");
        var textSalary = document.getElementById("text-insert-salary");

        var url = "http://localhost:5120/InsertEmployee?lastName=" + textLastName.value + "&firstName=" + textFirstName.value + "&salary=" + textSalary.value;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterInsertEmployee;
        xhr.open("GET", url);
        xhr.send(null);

        function doAfterInsertEmployee() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }

        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";

    }

    function insertEmployeeCancel() {

        var textFirstName = document.getElementById("text-insert-first-name");
        var textLastName = document.getElementById("text-insert-last-name");
        var textSalary = document.getElementById("text-insert-salary");

        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";

    }

    function updateEmployee() {

        var textEmployeeId = document.getElementById("text-update-employee-id");
        var textFirstName = document.getElementById("text-update-first-name");
        var textLastName = document.getElementById("text-update-last-name");
        var textSalary = document.getElementById("text-update-salary");

        var url = "http://localhost:5120/UpdateEmployee?employeeId=" + textEmployeeId.value + "&lastName=" + textLastName.value + "&firstName=" + textFirstName.value + "&salary=" + textSalary.value;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterUpdateEmployee;
        xhr.open("GET", url);
        xhr.send(null);

        function doAfterUpdateEmployee() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }

        textEmployeeId.value = "";
        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";

    }

    function updateEmployeeCancel() {

        var textEmployeeId = document.getElementById("text-update-employee-id");
        var textFirstName = document.getElementById("text-update-first-name");
        var textLastName = document.getElementById("text-update-last-name");
        var textSalary = document.getElementById("text-update-salary");

        textEmployeeId.value = "";
        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";

    }

    function handleButtonDeleteClick() {
        var textEmployeeId = document.getElementById("text-delete-employee-id");
        deleteEmployee(textEmployeeId.value);
    }

    function deleteEmployee(employeeId) {

        var url = "http://localhost:5120/DeleteEmployee?employeeid=" + employeeId;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterDeleteEmployee;
        xhr.open("GET", url);
        xhr.send(null);

        function doAfterDeleteEmployee() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showEmployees(response.employees);
                    } else {
                        alert("API Error: " + response.message);
                    }
                } else {
                    alert("Server Error: " + xhr.status + " " + xhr.statusText);
                }
            }
        }

    }

    function deleteEmployeeCancel() {
        var textEmployeeId = document.getElementById("text-delete-employee-id");
        textEmployeeId.value = "";
    }

    //Invoke searchEmployees() on load
    searchEmployees();
}

webapp_02();

