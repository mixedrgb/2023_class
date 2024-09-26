function webapp_02() {

    //Get elements

    var anchorNavEmployees = document.getElementById("anchor-nav-employees");
    var anchorNavDepartments = document.getElementById("anchor-nav-departments");
    var anchorNavProducts = document.getElementById("anchor-nav-products");

    var pageEmployees = document.getElementById("page-employees");
    var pageDepartments = document.getElementById("page-departments");
    var pageProducts = document.getElementById("page-products");

    var textSearch = document.getElementById("text-search");

    var buttonSearch = document.getElementById("button-search");
    var buttonSearchClear = document.getElementById("button-search-clear");

    var employeeTable = document.getElementById("employee-table");

    var buttonShowInsertForm = document.getElementById("button-show-insert-form");
    var buttonInsert = document.getElementById("button-insert");
    var buttonInsertCancel = document.getElementById("button-insert-cancel");

    var buttonDelete = document.getElementById("button-delete");
    var buttonDeleteCancel = document.getElementById("button-delete-cancel");

    var buttonUpdate = document.getElementById("button-update");
    var buttonUpdateCancel = document.getElementById("button-update-cancel");

    var selectRowsPerPage = document.getElementById("select-rows-per-page");
    var selectDepartment = document.getElementById("select-department");

    var buttonPagePrev = document.getElementById("button-page-prev");
    var textPage = document.getElementById("text-page");
    var buttonPageNext = document.getElementById("button-page-next");
    var pRowsMessage = document.getElementById("p-rows-message");

    //Add event listeners
    window.addEventListener('popstate', handlePopState);

    anchorNavEmployees.addEventListener("click", handleClickAnchorNavEmployees);
    anchorNavDepartments.addEventListener("click", handleClickAnchorNavDepartments);
    anchorNavProducts.addEventListener("click", handleClickAnchorNavProducts);

    textSearch.addEventListener("keyup", handleTextSearchKeyUp);

    buttonSearch.addEventListener("click", searchEmployees);
    buttonSearchClear.addEventListener("click", searchClear);

    buttonShowInsertForm.addEventListener("click", showInsertForm);
    buttonInsert.addEventListener("click", insertEmployee);
    buttonInsertCancel.addEventListener("click", insertEmployeeCancel);

    buttonDelete.addEventListener("click", handleButtonDeleteClick);
    buttonDeleteCancel.addEventListener("click", deleteEmployeeCancel);

    buttonUpdate.addEventListener("click", updateEmployee);
    buttonUpdateCancel.addEventListener("click", updateEmployeeCancel);

    selectRowsPerPage.addEventListener("change", handleChangeRowsPerPage);
    buttonPagePrev.addEventListener("click", handleButtonPagePrevClick);
    buttonPageNext.addEventListener("click", handleButtonPageNextClick);

    //Functions
    function handleClickAnchorNavEmployees(e) {
        window.history.pushState({}, "", "/" + "employees");
        showPage("employees");
        e.preventDefault();
    }

    function handleClickAnchorNavDepartments(e) {
        window.history.pushState({}, "", "/" + "departments");
        showPage("departments");
        e.preventDefault();
    }

    function handleClickAnchorNavProducts(e) {
        window.history.pushState({}, "", "/" + "products");
        showPage("products");
        e.preventDefault();
    }

    function showPage(page) {
        if (page.toLowerCase() === "employees" || page === "") {
            pageEmployees.classList.remove("visually-hidden");
            pageDepartments.classList.add("visually-hidden");
            pageProducts.classList.add("visually-hidden");
        } else if (page.toLowerCase() === "departments") {
            pageEmployees.classList.add("visually-hidden");
            pageDepartments.classList.remove("visually-hidden");
            pageProducts.classList.add("visually-hidden");
        } else if (page.toLowerCase() === "products") {
            pageEmployees.classList.add("visually-hidden");
            pageDepartments.classList.add("visually-hidden");
            pageProducts.classList.remove("visually-hidden");
        }
    }

    function handleNewUrl() {
        var page = window.location.pathname.split('/')[1];

        if (page === "") {
            window.history.replaceState({}, "", "/" + "employees");
        } else {
            window.history.replaceState({}, "", "/" + page);
        }

        showPage(page);
    }

    function handlePopState() {
        var page = window.location.pathname.split('/')[1];
        showPage(page);
    }

    function handleTextSearchKeyUp(e) {
        textPage.value = 1;
        searchEmployees();
    }

    function searchEmployees() {

        var url = "http://localhost:5120/SearchEmployees?search=" + textSearch.value + "&pageSize=" + selectRowsPerPage.value + "&pageNumber=" + textPage.value;

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
                        showSearchResultsMessage(response.employees);
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

    function getDepartments() {

        var url = "http://localhost:5120/GetDepartments";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = doAfterGetDepartments;
        xhr.open("GET", url);

        xhr.send(null);

        function doAfterGetDepartments() {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {

                    var response = JSON.parse(xhr.responseText);

                    if (response.result === "success") {
                        showDepartments(response.departments);
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

            var employeeSalary = (employee.salary === null) ? "" : employee.salary;

            employeeTableText = employeeTableText + "<tr><th scope='row'>" + employee.employeeId + "</th><td id='emp-" + employee.employeeId + "-first-name'>" + employee.firstName + "</td><td id='emp-" + employee.employeeId + "-last-name'>" + employee.lastName + "</td><td id='emp-" + employee.employeeId + "-salary'>" + employeeSalary + "</td><td><div class='row g-2'><div class='col-auto'><button type='button' data-employee-id='" + employee.employeeId + "' class='btn btn-outline-primary btn-sm btn-employee-table-update'>Update</button></div><div class='col-auto'><button id='' type='button' data-employee-id='" + employee.employeeId + "' class='btn btn-outline-primary btn-sm btn-employee-table-delete'>Delete</button></div></div></td></tr>";
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

    function showDepartments(departments) {
        var departmentSelectText = "<div class='row mb-2'><select id='select-department' class='form-select form-select-sm'><option selected='' value='0'>Pick One</option>";

        for (var i = 0; i < departments.length; i++) {
            var department = departments[i];
            departmentSelectText = departmentSelectText + "<option value='" + department.departmentId + "'>" + department.departmentName + "</option>";
        }

        departmentSelectText = departmentSelectText + "</select></div>";

        selectDepartment.innerHTML = departmentSelectText;
    }


    function showSearchResultsMessage(employees) {

        var searchResultsCount = 0;
        if (employees.length > 0) {
            searchResultsCount = employees[0].employeeCount;
        }

        var pageSize = Number(selectRowsPerPage.value);
        var pageNumber = Number(textPage.value);

        var firstNumber = pageSize * pageNumber - pageSize + 1;
        var secondNumber = firstNumber + pageSize - 1;
        if (secondNumber > searchResultsCount) {
            secondNumber = searchResultsCount;
        }

        pRowsMessage.innerHTML = "Row " + firstNumber + " through " + secondNumber + " of " + searchResultsCount;

    }

    function handleChangeRowsPerPage(e) {
        //alert("You changed rows per page to " + e.target.value);
        textPage.value = 1;
        searchEmployees();
    }

    function handleButtonPagePrevClick(e) {
        if (Number(textPage.value) > 1) {
            textPage.value = Number(textPage.value) - 1;
            searchEmployees();
        }
    }

    function handleButtonPageNextClick(e) {
        textPage.value = Number(textPage.value) + 1;
        searchEmployees();
    }

    function handleEmployeeTableUpdateClick(e) {
        var employeeId = e.target.getAttribute("data-employee-id");

        //alert("you want to update employee " + employeeId);

        var rowFirstName = document.getElementById("emp-" + employeeId + "-first-name");
        var rowLastName = document.getElementById("emp-" + employeeId + "-last-name");
        var rowSalary = document.getElementById("emp-" + employeeId + "-salary");

        var textEmployeeId = document.getElementById("text-update-employee-id");
        var textFirstName = document.getElementById("text-update-first-name");
        var textLastName = document.getElementById("text-update-last-name");
        var textSalary = document.getElementById("text-update-salary");

        textEmployeeId.value = employeeId;
        textFirstName.value = rowFirstName.innerText;
        textLastName.value = rowLastName.innerText;
        textSalary.value = rowSalary.innerText;

        var updateForm = document.getElementById("form-update");
        updateForm.classList.remove("visually-hidden");
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

    function showInsertForm() {
        var formInsert = document.getElementById("form-insert");
        formInsert.classList.remove("visually-hidden");
        buttonShowInsertForm.classList.add("visually-hidden");
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

        var formInsert = document.getElementById("form-insert");
        formInsert.classList.add("visually-hidden");
        buttonShowInsertForm.classList.remove("visually-hidden");

        textFirstName.value = "";
        textLastName.value = "";
        textSalary.value = "";
    }

    function insertEmployeeCancel() {

        var textFirstName = document.getElementById("text-insert-first-name");
        var textLastName = document.getElementById("text-insert-last-name");
        var textSalary = document.getElementById("text-insert-salary");

        var formInsert = document.getElementById("form-insert");
        formInsert.classList.add("visually-hidden");
        buttonShowInsertForm.classList.remove("visually-hidden");

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

        var updateForm = document.getElementById("form-update");
        updateForm.classList.add("visually-hidden");

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

        var updateForm = document.getElementById("form-update");
        updateForm.classList.add("visually-hidden");

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
    handleNewUrl();
    searchEmployees();
    getDepartments();
}

webapp_02();

