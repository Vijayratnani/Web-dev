document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage (if available)
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${task}
                <button class="edit" data-index="${index}">Edit</button>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
        saveTasks();
    }

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listener to add a new task
    addTaskButton.addEventListener("click", () => {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            renderTasks();
            taskInput.value = "";
        }
    });

    // Event delegation for editing and deleting tasks
    taskList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
            const index = e.target.getAttribute("data-index");
            const updatedTask = prompt("Edit the task:", tasks[index]);
            if (updatedTask !== null) {
                tasks[index] = updatedTask;
                renderTasks();
            }
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.getAttribute("data-index");
            if (confirm("Are you sure you want to delete this task?")) {
                tasks.splice(index, 1);
                renderTasks();
            }
        }
    });

    // Initial rendering of tasks
    renderTasks();
});
