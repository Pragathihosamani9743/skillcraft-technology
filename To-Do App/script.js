document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskDateTime = document.getElementById('taskDateTime');
    const addTaskButton = document.getElementById('addTask');
    const todoList = document.getElementById('todoList');
    const completedList = document.getElementById('completedList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = '';
        completedList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <span class="task-date">${task.date ? new Date(task.date).toLocaleString() : ''}</span>
                <div class="task-actions">
                    <button class="edit-task" data-index="${index}"><i class="fas fa-edit"></i></button>
                    <button class="delete-task" data-index="${index}"><i class="fas fa-trash-alt"></i></button>
                    <button class="toggle-task" data-index="${index}">
                        <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                </div>
            `;

            if (task.completed) {
                completedList.appendChild(li);
            } else {
                todoList.appendChild(li);
            }
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        const date = taskDateTime.value;

        if (text) {
            tasks.push({ text, date, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
            taskDateTime.value = '';
        }
    }

    function editTask(index) {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    }

    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-task')) {
            const index = e.target.closest('.edit-task').dataset.index;
            editTask(parseInt(index));
        } else if (e.target.closest('.delete-task')) {
            const index = e.target.closest('.delete-task').dataset.index;
            deleteTask(parseInt(index));
        } else if (e.target.closest('.toggle-task')) {
            const index = e.target.closest('.toggle-task').dataset.index;
            toggleTask(parseInt(index));
        }
    });

    renderTasks();
});
