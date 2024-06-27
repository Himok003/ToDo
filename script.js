document.addEventListener('DOMContentLoaded', (event) => {
	// Mainīgie lielumi mijiedarbībai ar lietotāja saskarnes elementiem
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Iegūstiet uzdevumus no vietējās glabātuves vai izveidojiet tukšu sarakstu
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Funkcija, lai attēlot uzdevumu 
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    // Funkcija, lai pievienotu uzdevumu
    function addTask() {
        const task = taskInput.value.trim();
        if (task) {
            tasks.push(task);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    // Funkcija, lai dzēstu uzdevumu
    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    // Funkcija, lai saglabātu uzdevumus
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Notikumu pievienošana 
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Sākotnēji attēlot uzdevumus
    renderTasks();
});
