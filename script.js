// script.js

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    // Get the task input value
    var taskInput = document.getElementById('taskInput');
    var taskValue = taskInput.value;

    // Check if the input is not empty
    if (taskValue.trim() !== '') {
        // Create a new list item
        var li = document.createElement('li');

        // Add a checkbox for completing tasks
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        li.appendChild(checkbox);

        // Add the task text
        li.appendChild(document.createTextNode(taskValue));

        // Add a delete button
        var deleteButton = document.createElement('button');
        deleteButton.appendChild(document.createTextNode('Delete'));
        deleteButton.onclick = function() {
            // Remove the task when the delete button is clicked
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteButton);

        // Append the new task to the task list
        document.getElementById('taskList').appendChild(li);

        // Clear the input field
        taskInput.value = '';

        // Attach event listener to the checkbox
        checkbox.addEventListener('change', function() {
            // Toggle the completed status of the task
            li.classList.toggle('completed');
            saveTasks();
        });

        // Save tasks to local storage
        saveTasks();
    }
}

function saveTasks() {
    // Get all task items
    var taskList = document.getElementById('taskList').getElementsByTagName('li');

    // Create an array to store task data
    var tasks = [];

    // Iterate through each task item and save its data
    for (var i = 0; i < taskList.length; i++) {
        var task = {
            text: taskList[i].textContent,
            completed: taskList[i].classList.contains('completed')
        };
        tasks.push(task);
    }

    // Save the tasks array to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    // Get tasks array from local storage
    var storedTasks = localStorage.getItem('tasks');

    // If tasks exist in local storage, load and display them
    if (storedTasks) {
        var tasks = JSON.parse(storedTasks);

        // Clear the existing task list
        var taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        // Add each task to the task list
        for (var i = 0; i < tasks.length; i++) {
            var li = document.createElement('li');
            li.textContent = tasks[i].text;

            // Add checkbox and delete button
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tasks[i].completed;
            li.appendChild(checkbox);

            var deleteButton = document.createElement('button');
            deleteButton.appendChild(document.createTextNode('Delete'));
            deleteButton.onclick = function() {
                li.remove();
                saveTasks();
            };
            li.appendChild(deleteButton);

            // Add the task item to the task list
            taskList.appendChild(li);

            // Attach event listener to the checkbox
            checkbox.addEventListener('change', function() {
                li.classList.toggle('completed');
                saveTasks();
            });
        }
    }
}