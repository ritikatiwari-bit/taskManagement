/* =====================================================
   DOM.JS
   DOM selection and UI functions
===================================================== */


/* =====================================================
   DOM ELEMENTS
===================================================== */

const taskForm = document.getElementById("taskForm");

const taskIdInput = document.getElementById("taskId");

const taskTitleInput = document.getElementById("taskTitle");

const taskDescriptionInput =
    document.getElementById("taskDescription");

const taskDateInput =
    document.getElementById("taskDate");

const taskPriorityInput =
    document.getElementById("taskPriority");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const filterSelect =
    document.getElementById("filterSelect");

const totalTasksElement =
    document.getElementById("totalTasks");

const pendingTasksElement =
    document.getElementById("pendingTasks");

const completedTasksElement =
    document.getElementById("completedTasks");

const highPriorityTasksElement =
    document.getElementById("highPriorityTasks");

const formHeading =
    document.getElementById("formHeading");

const submitBtn =
    document.getElementById("submitBtn");

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

const currentDate =
    document.getElementById("currentDate");


/* =====================================================
   DISPLAY TASKS
===================================================== */

function displayTasks(taskArray) {

    taskList.innerHTML = "";


    if (taskArray.length === 0) {

        emptyState.classList.remove("hidden");

        return;
    }


    emptyState.classList.add("hidden");


    taskArray.forEach(task => {

        const taskCard =
            createTaskCard(task);

        taskList.appendChild(taskCard);

    });

}


/* =====================================================
   CREATE TASK CARD
===================================================== */

function createTaskCard(task) {

    const card = document.createElement("article");

    card.className = "task-card";


    if (task.completed) {
        card.classList.add("completed");
    }


    const priorityClass =
        getPriorityClass(task.priority);


    const formattedDate =
        formatDate(task.dueDate);


    card.innerHTML = `

        <div class="task-top">

            <div>

                <h3 class="task-title">
                    ${escapeHTML(task.title)}
                </h3>

            </div>

            <span class="priority ${priorityClass}">
                ${task.priority}
            </span>

        </div>


        <p class="task-description">
            ${escapeHTML(task.description)}
        </p>


        <div class="task-meta">

            <span>
                📅 ${formattedDate}
            </span>

            <span>
                ${task.completed
            ? "✓ Completed"
            : "⏳ Pending"}
            </span>

        </div>


        <div class="task-actions">

            <button
                class="complete-btn"
                data-action="complete"
                data-id="${task.id}">

                ${task.completed
            ? "↩ Mark Pending"
            : "✓ Complete"}

            </button>


            <button
                class="edit-btn"
                data-action="edit"
                data-id="${task.id}">

                ✎ Edit

            </button>


            <button
                class="delete-btn"
                data-action="delete"
                data-id="${task.id}">

                🗑 Delete

            </button>

        </div>

    `;


    return card;
}


/* =====================================================
   PRIORITY CLASS
===================================================== */

function getPriorityClass(priority) {

    if (priority === "High") {
        return "priority-high";
    }


    if (priority === "Medium") {
        return "priority-medium";
    }


    return "priority-low";
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "No date";
    }


    const date = new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================================
   UPDATE STATISTICS
===================================================== */

function updateStatistics() {

    const statistics =
        getStatistics();


    totalTasksElement.textContent =
        statistics.total;


    pendingTasksElement.textContent =
        statistics.pending;


    completedTasksElement.textContent =
        statistics.completed;


    highPriorityTasksElement.textContent =
        statistics.highPriority;
}


/* =====================================================
   DISPLAY CURRENT DATE
===================================================== */

function displayCurrentDate() {

    const today = new Date();


    currentDate.textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
}


/* =====================================================
   LOAD TASK INTO FORM
===================================================== */

function loadTaskIntoForm(task) {

    taskIdInput.value = task.id;

    taskTitleInput.value = task.title;

    taskDescriptionInput.value =
        task.description;

    taskDateInput.value =
        task.dueDate;

    taskPriorityInput.value =
        task.priority;


    formHeading.textContent =
        "Edit Task";


    submitBtn.textContent =
        "Save Changes";


    cancelEditBtn.classList.remove("hidden");


    document
        .getElementById("add-task")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =====================================================
   RESET FORM
===================================================== */

function resetTaskForm() {

    taskForm.reset();

    taskIdInput.value = "";


    taskPriorityInput.value =
        "Medium";


    formHeading.textContent =
        "Add New Task";


    submitBtn.textContent =
        "+ Add Task";


    cancelEditBtn.classList.add("hidden");


    clearErrors();
}


/* =====================================================
   CLEAR VALIDATION ERRORS
===================================================== */

function clearErrors() {

    document.getElementById(
        "titleError"
    ).textContent = "";


    document.getElementById(
        "descriptionError"
    ).textContent = "";


    document.getElementById(
        "dateError"
    ).textContent = "";
}


/* =====================================================
   DISPLAY SUCCESS MESSAGE
===================================================== */

function showMessage(message) {

    alert(message);
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    const div =
        document.createElement("div");
    div.textContent = text;

    return div.innerHTML;
}