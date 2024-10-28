const apiUrl = "http://localhost:3000/todos";
const todoList = document.getElementById("todo-list");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoInput = document.getElementById("todo-input");

// Fetch and display todos
async function fetchTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();
  todoList.innerHTML = ""; // Clear existing list
  todos.forEach((todo) => renderTodoItem(todo));
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

// Add a new todo
async function addTodo() {
  const title = todoInput.value.trim();
  if (title === "") return alert("Please enter a todo title!");

  const newTodo = { title, completed: false };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  const createdTodo = await response.json();
  renderTodoItem(createdTodo);
  todoInput.value = ""; // Clear input
}

// Delete a todo
async function deleteTodo(id) {
  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  fetchTodos(); // Refresh list after deletion
}

// Toggle completion status
async function toggleComplete(id, completed) {
  await fetch(`${apiUrl}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: !completed }),
  });
  fetchTodos(); // Refresh list after update
}

// Event listeners
addTodoBtn.addEventListener("click", addTodo);
document.addEventListener("DOMContentLoaded", fetchTodos);
