# Jest Dojo

This is a simple Website that you can practice setting up and writing unit tests

## Installation

Fork or clone your own copy.

Setup Jest for testing

Install jest
```bash
npm -D install jest
```

Install Babel core and preset-end v.22 - this allows you to use import syntax to access the taskManager functions you need to test
```bash
npm -D install @babel/core@7.22 @babel/preset-env@7.22
```

Add a file called `babel.config.json` to your root directory
Add the content below
```json
{
  "presets": [["@babel/preset-env", { "targets": { "node": "current" } }]]
}
```

Add this to your npm scripts in package.json
```json
"test":"jest"
```
Run this command to run the tests
```bash
npm run test
```

## Usage

1. Open index.html in live server (to see how the website works)
2. Write unit tests in Jest for the practice test cases below (requires localStorage mock for most test)
3. Make sure all tests pass and work correctly

## Practice test cases

### 1. `saveTasks(tasks)`

- **Requirement 1**: Test that the given task list is saved to `localStorage`.
- **Requirement 2**: Test that an empty task list is correctly saved to `localStorage`.

### 2. `completeTask(tasks, index)`

- **Requirement 1**: Test that a task at the given `index` is marked as completed (`completed: true`).
- **Requirement 2**: Test that the updated task list is saved to `localStorage` after completing a task.

### 3. `clearCompletedTasks(tasks)`

- **Requirement 1**: Test that all completed tasks are removed from the task list.
- **Requirement 2**: Test that `localStorage` is updated with the remaining tasks after clearing completed tasks.

### 4. `loadTasks()`

- **Requirement 1**: Test that tasks are correctly loaded from `localStorage`.
- **Requirement 2**: Test that an empty array is returned if `localStorage` has no tasks stored.

### 5. `addTask(tasks, taskDescription)`

- **Requirement 1**: Test that a new task is added to the list with the correct description and completion status (`completed: false`).
- **Requirement 2**: Test that the task list is saved to `localStorage` after adding a task.
