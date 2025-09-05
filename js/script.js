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
        filtered = todoList.map((item, idx) => ({ ...item, realIndex: idx }));
    } else if (filterValue === 'unfinished') {
        filtered = todoList
            .map((item, idx) => ({ ...item, realIndex: idx }))
            .filter(item => !item.completed);
    } else if (filterValue === 'finished') {
        filtered = todoList
            .map((item, idx) => ({ ...item, realIndex: idx }))
            .filter(item => item.completed);
    }

    if (filtered.length === 0) {
        todoListElement.innerHTML = '<p>No task added yet</p>';
        return;
    }

    filtered.forEach((item) => {
        const labelStyle = item.completed ? 'text-decoration: line-through; color: gray;' : '';
        todoListElement.innerHTML += `
            <li style="list-style:none; margin-bottom:8px;">
                <input type="checkbox" id="todo-check-${item.realIndex}" ${item.completed ? 'checked' : ''} onchange="toggleTodo(${item.realIndex})">
                <label for="todo-check-${item.realIndex}" style="${labelStyle}">${item.text} - Due ${item.dueDate}</label>
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
    
    todoList.forEach((item, index) => {
        const labelStyle = item.completed ? 'text-decoration: line-through; color: gray;' : '';
        todoListElement.innerHTML += `
            <li style="list-style:none; margin-bottom:8px;">
                <input type="checkbox" id="todo-check-${index}" ${item.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
                <label for="todo-check-${index}" style="${labelStyle}">${item.text} - Due ${item.dueDate}</label>
            </li>
        `;
    });
}

function toggleTodo(index) {
    todoList[index].completed = !todoList[index].completed;
    filterTodo(); // gunakan filterTodo agar tampilan sesuai filter aktif
}

