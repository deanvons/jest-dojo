import {
  loadTasks,
  saveTasks,
  addTask,
  completeTask,
  clearCompletedTasks,
} from "./taskManager";

// Simple mock for localStorage
const mockLocalStorage = {
  store: {},

  getItem(key) {
    return this.store[key] || null;
  },

  setItem(key, value) {
    this.store[key] = value;
  },

  clear() {
    this.store = {};
  },

  removeItem(key) {
    delete this.store[key];
  },
};

// Jest setup to use mockLocalStorage before each test
beforeEach(() => {
  mockLocalStorage.clear(); // Reset localStorage before each test
  global.localStorage = mockLocalStorage; // Assign mock to global localStorage so that the tested functions use this instead of localStorage in the browser
});

//note the it() functions is the same as test() it was added as an alternative to be more intuitive
describe("saveTasks()", () => {
  it("should save given task list to localStorage (Requirement 1)", () => {
    // Arrange
    const tasks = [{ description: "Test task", completed: false }];
    const expectedStoredValue = JSON.stringify(tasks);

    // Act
    saveTasks(tasks);

    // Assert
    const actualStoredValue = localStorage.getItem("tasks");
    expect(actualStoredValue).toBe(expectedStoredValue);
  });

  it("should correctly save an empty task list to localStorage (Requirement 2)", () => {
    // Arrange
    const tasks = [];
    const expectedStoredValue = JSON.stringify(tasks);

    // Act
    saveTasks(tasks);

    // Assert
    const actualStoredValue = localStorage.getItem("tasks");
    expect(actualStoredValue).toBe(expectedStoredValue);
  });
});

describe("completeTask()", () => {
  it("should mark a task as completed at the given index (Requirement 1)", () => {
    // Arrange
    const tasks = [{ description: "Test task", completed: false }];
    const taskIndex = 0;

    // Act
    completeTask(tasks, taskIndex);

    // Assert
    expect(tasks[taskIndex].completed).toBe(true);
  });

  it("should save the updated task list to localStorage after completing a task (Requirement 2)", () => {
    // Arrange
    const tasks = [{ description: "Test task", completed: false }];
    const taskIndex = 0;
    const expectedStoredValue = JSON.stringify([
      { description: "Test task", completed: true },
    ]);

    // Act
    completeTask(tasks, taskIndex);

    // Assert
    const actualStoredValue = localStorage.getItem("tasks");
    expect(actualStoredValue).toBe(expectedStoredValue);
  });
});

describe("clearCompletedTasks()", () => {
  it("should remove all completed tasks from the task list (Requirement 1)", () => {
    // Arrange
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
    ];
    const expectedRemainingTasks = [
      { description: "Task 2", completed: false },
    ];

    // Act
    const remainingTasks = clearCompletedTasks(tasks);

    // Assert
    expect(remainingTasks).toEqual(expectedRemainingTasks);
  });

  it("should update localStorage with the remaining tasks after clearing completed tasks (Requirement 2)", () => {
    // Arrange
    const tasks = [
      { description: "Task 1", completed: true },
      { description: "Task 2", completed: false },
    ];
    const expectedStoredValue = JSON.stringify([
      { description: "Task 2", completed: false },
    ]);

    // Act
    clearCompletedTasks(tasks);

    // Assert
    const actualStoredValue = localStorage.getItem("tasks");
    expect(actualStoredValue).toBe(expectedStoredValue);
  });
});

describe("loadTasks()", () => {
  it("should correctly load tasks from localStorage (Requirement 1)", () => {
    // Arrange
    const tasks = [{ description: "Test task", completed: false }];
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Act
    const loadedTasks = loadTasks();

    // Assert
    expect(loadedTasks).toEqual(tasks);
  });

  it("should return an empty array if localStorage has no tasks (Requirement 2)", () => {
    // Arrange
    localStorage.clear(); // Ensure no tasks are in localStorage

    // Act
    const loadedTasks = loadTasks();

    // Assert
    expect(loadedTasks).toEqual([]);
  });
});

describe("addTask()", () => {
  it("should add a new task with correct description and completed status (Requirement 1)", () => {
    // Arrange
    const tasks = [];
    const newTaskDescription = "New Task";
    const expectedTasks = [{ description: "New Task", completed: false }];

    // Act
    const updatedTasks = addTask(tasks, newTaskDescription);

    // Assert
    expect(updatedTasks).toEqual(expectedTasks);
  });

  it("should save the task list to localStorage after adding a task (Requirement 2)", () => {
    // Arrange
    const tasks = [];
    const newTaskDescription = "New Task";
    const expectedStoredValue = JSON.stringify([
      { description: "New Task", completed: false },
    ]);

    // Act
    addTask(tasks, newTaskDescription);

    // Assert
    const actualStoredValue = localStorage.getItem("tasks");
    expect(actualStoredValue).toBe(expectedStoredValue);
  });
});
