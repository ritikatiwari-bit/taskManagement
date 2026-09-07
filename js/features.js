/* =====================================================
   FEATURES.JS
   Task data and task management functions
===================================================== */


/*
    Default tasks are displayed when the application
    is opened for the first time.
*/

const defaultTasks = [
    {
        id: 1,
        title: "Complete Internship Project",
        description: "Finish the final web development project.",
        dueDate: "2026-09-10",
        priority: "High",
        completed: false
    },

    {
        id: 2,
        title: "Review JavaScript Concepts",
        description: "Revise arrays, objects, functions and DOM manipulation.",
        dueDate: "2026-09-12",
        priority: "Medium",
        completed: false
    },

    {
        id: 3,
        title: "Update GitHub Repository",
        description: "Upload the project and maintain meaningful commits.",
        dueDate: "2026-09-15",
        priority: "Low",
        completed: true
    }
];


/* =====================================================
   LOAD TASKS
===================================================== */

let tasks = loadTasks();


function loadTasks() {

    const savedTasks = localStorage.getItem("taskFlowTasks");

    if (savedTasks) {
        return JSON.parse(savedTasks);
    }

    return defaultTasks;
}


/* =====================================================
   SAVE TASKS
===================================================== */

function saveTasks() {

    localStorage.setItem(
        "taskFlowTasks",
        JSON.stringify(tasks)
    );
}


/* =====================================================
   GENERATE ID
===================================================== */

function generateId() {

    if (tasks.length === 0) {
        return 1;
    }

    const ids = tasks.map(task => task.id);

    return Math.max(...ids) + 1;
}


/* =====================================================
   ADD TASK
===================================================== */

function addTask(title, description, dueDate, priority) {

    const newTask = {

        id: generateId(),

        title: title,

        description: description,

        dueDate: dueDate,

        priority: priority,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    return newTask;
}


/* =====================================================
   DELETE TASK
===================================================== */

function deleteTask(taskId) {

    tasks = tasks.filter(
        task => task.id !== Number(taskId)
    );

    saveTasks();
}


/* =====================================================
   GET TASK
===================================================== */

function getTask(taskId) {

    return tasks.find(
        task => task.id === Number(taskId)
    );
}


/* =====================================================
   EDIT TASK
===================================================== */

function editTask(
    taskId,
    title,
    description,
    dueDate,
    priority
) {

    const task = getTask(taskId);

    if (!task) {
        return false;
    }


    task.title = title;

    task.description = description;

    task.dueDate = dueDate;

    task.priority = priority;


    saveTasks();

    return true;
}


/* =====================================================
   TOGGLE TASK
===================================================== */

function toggleTask(taskId) {

    const task = getTask(taskId);

    if (!task) {
        return;
    }


    task.completed = !task.completed;

    saveTasks();
}


/* =====================================================
   SEARCH TASKS
===================================================== */

function searchTasks(keyword) {

    const searchTerm = keyword
        .trim()
        .toLowerCase();


    if (searchTerm === "") {
        return tasks;
    }


    return tasks.filter(task => {

        return (
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );

    });
}


/* =====================================================
   FILTER TASKS
===================================================== */

function filterTasks(filter) {

    switch (filter) {

        case "pending":

            return tasks.filter(
                task => !task.completed
            );


        case "completed":

            return tasks.filter(
                task => task.completed
            );


        case "high":

            return tasks.filter(
                task => task.priority === "High"
            );


        case "medium":

            return tasks.filter(
                task => task.priority === "Medium"
            );


        case "low":

            return tasks.filter(
                task => task.priority === "Low"
            );


        default:

            return tasks;
    }
}


/* =====================================================
   SEARCH + FILTER
===================================================== */

function getFilteredTasks(searchTerm, filter) {

    let result = searchTasks(searchTerm);


    if (filter !== "all") {

        result = result.filter(task => {

            switch (filter) {

                case "pending":
                    return !task.completed;

                case "completed":
                    return task.completed;

                case "high":
                    return task.priority === "High";

                case "medium":
                    return task.priority === "Medium";

                case "low":
                    return task.priority === "Low";

                default:
                    return true;
            }

        });

    }

    return result;
}


/* =====================================================
   TASK STATISTICS
===================================================== */

function getStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = tasks.filter(
        task => !task.completed
    ).length;

    const highPriority = tasks.filter(
        task => task.priority === "High"
    ).length;


    return {
        total: total,
        completed: completed,
        pending: pending,
        highPriority: highPriority
    };
}