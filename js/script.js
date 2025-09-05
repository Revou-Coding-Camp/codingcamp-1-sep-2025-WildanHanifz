let todoList = [];

function validateInput() {
    const todoInput = document.getElementById('todo-input').value;
    const todoDataInput = document.getElementById('todo-date-input').value;

    if (todoInput === '' || todoDataInput === '') {
        alert('Please fill in both fields');
    } else {
        addTodo(todoInput, todoDataInput);
    }
}

function addTodo(todo, dueDate) {
    const todoItem = { 
        id: Date.now() + Math.random(), // id unik
        text: todo, 
        dueDate: dueDate,  
        completed: false
    };
    todoList.push(todoItem);
    renderTodoList();
} 

function deleteTodo() {
    const filterValue = document.getElementById('filter-select').value;
    if (filterValue === 'finished') {
        todoList = todoList.filter(item => !item.completed);
    } else {
        todoList = [];
    }
    filterTodo(); 
}

function filterTodo() {
    const filterValue = document.getElementById('filter-select').value;
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';

    let filtered = [];
    if (filterValue === 'all') {
        filtered = todoList;
    } else if (filterValue === 'unfinished') {
        filtered = todoList.filter(item => !item.completed);
    } else if (filterValue === 'finished') {
        filtered = todoList.filter(item => item.completed);
    }

    if (filtered.length === 0) {
        todoListElement.innerHTML = '<p>No task added yet</p>';
        return;
    }

    filtered.forEach((item) => {
        const labelStyle = item.completed ? 'text-decoration: line-through; color: gray;' : '';
        todoListElement.innerHTML += `
            <li style="list-style:none; margin-bottom:8px;">
                <input type="checkbox" id="todo-check-${item.id}" ${item.completed ? 'checked' : ''} onchange="toggleTodo('${item.id}')">
                <label for="todo-check-${item.id}" style="${labelStyle}">${item.text} - Due ${item.dueDate}</label>
            </li>
        `;
    });
}

function renderTodoList() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';

    if (todoList.length === 0) {
        todoListElement.innerHTML = '<p>No task added yet</p>';
        return;
    }
    
    todoList.forEach((item) => {
        const labelStyle = item.completed ? 'text-decoration: line-through; color: gray;' : '';
        todoListElement.innerHTML += `
            <li style="list-style:none; margin-bottom:8px;">
                <input type="checkbox" id="todo-check-${item.id}" ${item.completed ? 'checked' : ''} onchange="toggleTodo('${item.id}')">
                <label for="todo-check-${item.id}" style="${labelStyle}">${item.text} - Due ${item.dueDate}</label>
            </li>
        `;
    });
}

function toggleTodo(id) {
    const todo = todoList.find(item => item.id == id);
    if (todo) {
        todo.completed = !todo.completed;
    }
    filterTodo();
}

