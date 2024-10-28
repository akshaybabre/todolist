const apiUrl = "http://localhost:3000/todos";
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");
let idCounter = 1; // Default ID counter

// Fetch and display todos with error handling
async function fetchTodos() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    
    const todos = await response.json();

    // Update idCounter based on existing IDs
    if (todos.length > 0) {
      idCounter = Math.max(...todos.map(todo => todo.id)) + 1;
    }

    todoList.innerHTML = ""; // Clear existing list
    todos.forEach((todo) => renderTodoItem(todo));
  } catch (error) {
    console.error("Failed to fetch todos:", error.message);
  }
}

// Render a single todo item
function renderTodoItem(todo) {
  const listItem = document.createElement("li");
  listItem.className = "todo-item";
  listItem.innerHTML = `
    <span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">
      ${todo.title}
    </span>
    <div>
      <button onclick="toggleComplete(${todo.id}, ${todo.completed})">
        ${todo.completed ? "Undo" : "Complete"}
      </button>
      <button onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  `;
  todoList.appendChild(listItem);
}

// Add a new todo with error handling
async function addTodo() {
  const title = todoInput.value.trim();
  if (title === "") return alert("Please enter a todo title!");

  const newTodo = { id: idCounter++, title, completed: false };
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const createdTodo = await response.json();
    renderTodoItem(createdTodo);
    todoInput.value = ""; // Clear input
  } catch (error) {
    console.error("Failed to add todo:", error.message);
  }
}

// Delete a todo with error handling
async function deleteTodo(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    
    fetchTodos(); // Refresh list after deletion
  } catch (error) {
    console.error(`Failed to delete todo with ID ${id}:`, error.message);
  }
}

// Toggle completion status with error handling
async function toggleComplete(id, completed) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    fetchTodos(); // Refresh list after update
  } catch (error) {
    console.error(`Failed to toggle completion for todo with ID ${id}:`, error.message);
  }
}

// Event listeners
addTodoBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", fetchTodos);
