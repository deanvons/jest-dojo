// taskManager.js

export function loadTasks() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(tasks, taskDescription) {
    const task = {
        description: taskDescription,
        completed: false
    };
    tasks.push(task);
    saveTasks(tasks);
    return tasks;
}

export function completeTask(tasks, index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        saveTasks(tasks);
    }
    return tasks;
}

export function clearCompletedTasks(tasks) {
    const remainingTasks = tasks.filter(task => !task.completed);
    saveTasks(remainingTasks);
    return remainingTasks;
}
