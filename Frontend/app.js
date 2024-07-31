// frontend/app.js

document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    let isEditing = false;
    let currentTodoId = null;

    // Fetch todos from the backend
    fetch('/api/todos')
        .then(res => res.json())
        .then(todos => {
            todos.forEach(todo => {
                addTodoToDOM(todo);
            });
        });

    // Add or update a todo
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newTodo = { description: todoInput.value };

        if (isEditing) {
            // Update an existing todo
            fetch(`/api/todos/${currentTodoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            })
                .then(res => res.json())
                .then(updatedTodo => {
                    updateTodoInDOM(updatedTodo);
                    todoInput.value = '';
                    isEditing = false;
                    currentTodoId = null;
                });
        } else {
            // Add a new todo
            fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTodo)
            })
                .then(res => res.json())
                .then(todo => {
                    addTodoToDOM(todo);
                    todoInput.value = '';
                });
        }
    });

    // Add todo to DOM
    function addTodoToDOM(todo) {
        const li = document.createElement('li');
        li.textContent = todo.description;

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function () {
            todoInput.value = todo.description;
            isEditing = true;
            currentTodoId = todo.id;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            fetch(`/api/todos/${todo.id}`, {
                method: 'DELETE'
            }).then(() => {
                todoList.removeChild(li);
            });
        });

        li.appendChild(editButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }

    // Update todo in DOM
    function updateTodoInDOM(updatedTodo) {
        const items = todoList.getElementsByTagName('li');
        for (let item of items) {
            if (item.textContent.includes(updatedTodo.description)) {
                item.firstChild.textContent = updatedTodo.description;
                break;
            }
        }
    }
});
