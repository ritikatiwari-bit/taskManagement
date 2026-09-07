/* =====================================================
   SCRIPT.JS
   Main application logic and event handling
===================================================== */


/* =====================================================
   INITIALIZE APPLICATION
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayTasks(tasks);

        updateStatistics();

        displayCurrentDate();

        setupEventListeners();

    }
);


/* =====================================================
   EVENT LISTENERS
===================================================== */

function setupEventListeners() {


    /* -----------------------------------------------
       ADD / EDIT TASK FORM
    ------------------------------------------------ */

    taskForm.addEventListener(
        "submit",
        handleTaskSubmit
    );


    /* -----------------------------------------------
       SEARCH
    ------------------------------------------------ */

    searchInput.addEventListener(
        "input",
        handleSearch
    );


    /* -----------------------------------------------
       FILTER
    ------------------------------------------------ */

    filterSelect.addEventListener(
        "change",
        handleFilter
    );


    /* -----------------------------------------------
       TASK BUTTONS
    ------------------------------------------------ */

    taskList.addEventListener(
        "click",
        handleTaskAction
    );


    /* -----------------------------------------------
       CANCEL EDIT
    ------------------------------------------------ */

    cancelEditBtn.addEventListener(
        "click",
        resetTaskForm
    );


    /* -----------------------------------------------
       MOBILE MENU
    ------------------------------------------------ */

    const menuBtn =
        document.getElementById("menuBtn");

    const navLinks =
        document.getElementById("navLinks");


    menuBtn.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    /* -----------------------------------------------
       CLOSE MOBILE MENU AFTER CLICK
    ------------------------------------------------ */

    navLinks.addEventListener(
        "click",
        function (event) {

            if (
                event.target.tagName === "A"
            ) {

                navLinks.classList.remove(
                    "active"
                );

            }

        }
    );
}


/* =====================================================
   HANDLE TASK FORM
===================================================== */

function handleTaskSubmit(event) {

    event.preventDefault();


    const title =
        taskTitleInput.value.trim();


    const description =
        taskDescriptionInput.value.trim();


    const dueDate =
        taskDateInput.value;


    const priority =
        taskPriorityInput.value;


    /* -----------------------------------------------
       VALIDATION
    ------------------------------------------------ */

    if (
        !validateTaskForm(
            title,
            description,
            dueDate
        )
    ) {

        return;
    }


    /* -----------------------------------------------
       CHECK EDIT MODE
    ------------------------------------------------ */

    const taskId =
        taskIdInput.value;


    if (taskId) {

        editTask(
            taskId,
            title,
            description,
            dueDate,
            priority
        );


        showMessage(
            "Task updated successfully!"
        );

    } else {

        addTask(
            title,
            description,
            dueDate,
            priority
        );


        showMessage(
            "Task added successfully!"
        );

    }


    /* -----------------------------------------------
       UPDATE UI
    ------------------------------------------------ */

    resetTaskForm();

    refreshTasks();

}


/* =====================================================
   VALIDATE FORM
===================================================== */

function validateTaskForm(
    title,
    description,
    dueDate
) {

    clearErrors();


    let isValid = true;


    if (title === "") {

        document.getElementById(
            "titleError"
        ).textContent =
            "Task title is required.";

        isValid = false;
    }


    if (description === "") {

        document.getElementById(
            "descriptionError"
        ).textContent =
            "Task description is required.";

        isValid = false;
    }


    if (dueDate === "") {

        document.getElementById(
            "dateError"
        ).textContent =
            "Please select a due date.";

        isValid = false;
    }


    return isValid;
}


/* =====================================================
   HANDLE SEARCH
===================================================== */

function handleSearch() {

    refreshTasks();
}


/* =====================================================
   HANDLE FILTER
===================================================== */

function handleFilter() {
    refreshTasks();
}


/* =====================================================
   HANDLE TASK ACTION
===================================================== */

function handleTaskAction(event) {

    const button = event.target.closest("button");


    if (!button) {
        return;
    }

    const action =
        button.dataset.action;

    const taskId =
        button.dataset.id;

    /* -----------------------------------------------
       COMPLETE
    ------------------------------------------------ */

    if (action === "complete") {
        toggleTask(taskId);
        refreshTasks();
        return;
    }


    /* -----------------------------------------------
       EDIT
    ------------------------------------------------ */

    if (action === "edit") {
        const task =
            getTask(taskId);

        if (task) {
            loadTaskIntoForm(task);

        }
        return;
    }


    /* -----------------------------------------------
       DELETE
    ------------------------------------------------ */

    if (action === "delete") {
        deleteTaskWithConfirmation(
            taskId
        );
    }
}


/* =====================================================
   DELETE WITH CONFIRMATION
===================================================== */

function deleteTaskWithConfirmation(taskId) {
    const task =
        getTask(taskId);

    if (!task) {
        return;
    }

    const confirmed =
        confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

    if (!confirmed) {
        return;
    }

    deleteTask(taskId);

    showMessage(
        "Task deleted successfully!"
    );

    refreshTasks();
}


/* =====================================================
   REFRESH TASKS
===================================================== */

function refreshTasks() {
    const searchTerm =
        searchInput.value;

    const filter =
        filterSelect.value;

    const filteredTasks =
        getFilteredTasks(
            searchTerm,
            filter
        );

    displayTasks(filteredTasks);

    updateStatistics();
}