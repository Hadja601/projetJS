// Initialisation des éléments du DOM
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');
const taskCount = document.getElementById('taskCount');
const completedCount = document.getElementById('completedCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    taskList.innerHTML = '';
    let completed = 0;

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('click', () => toggleTask(index));

        const text = document.createElement('span');
        text.textContent = task.text;

        li.appendChild(checkbox);
        li.appendChild(text);
        taskList.appendChild(li);

        if (task.completed) completed++;
    });

    taskCount.textContent = `${tasks.length} tâche(s)`;
    completedCount.textContent = `${completed} terminée(s)`;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour ajouter une tâche
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
}});

// Fonction pour marquer une tâche comme terminée ou non
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Fonction pour vider toutes les tâches
clearButton.addEventListener('click', () => {
    tasks = [];
    renderTasks();
});

// Initialiser l'affichage des tâches
renderTasks();
