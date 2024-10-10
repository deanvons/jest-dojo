// app.js
import { loadTasks, addTask, completeTask, clearCompletedTasks } from './taskManager.js';

let tasks = loadTasks();

document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskDescription = document.getElementById('taskInput').value;
    if (taskDescription) {
        tasks = addTask(tasks, taskDescription);
        document.getElementById('taskInput').value = '';
        displayTasks();
    }
});

document.getElementById('clearCompletedButton').addEventListener('click', () => {
    tasks = clearCompletedTasks(tasks);
    displayTasks();
});

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.description;
        if (task.completed) {
            taskItem.style.textDecoration = 'line-through';
        }
        taskItem.addEventListener('click', () => {
            tasks = completeTask(tasks, index);
            displayTasks();
        });
        taskList.appendChild(taskItem);
    });
}

displayTasks();
