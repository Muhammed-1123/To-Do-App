const inputBox = document.getElementById('input-box');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('tasks-list');
const removeTaskButton = document.getElementById('remove-task');
const alertBox = document.getElementById('alert');
const searchBox = document.getElementById('search-box');

addTaskButton.addEventListener("click", (event) => {
    const taskText = inputBox.value;
    if (taskText !== '') {
        const task = document.createElement('li');
        task.classList.add('task');
        task.innerHTML = `
        <div class="cont">
            <input type="checkbox">
            <span id="task-name">${taskText}</span>
        </div>
        <button class="edit-task">Edit</button>
        <button class="delete-task">X</button>
        `;
        taskList.appendChild(task);
        inputBox.value = '';
        inputBox.focus();
        saveTasks();
    } else 
    {
        const alert_Box = document.querySelector('.alert-text');
        if (alert_Box === null){
            const ElMessage = document.createElement('p');
            ElMessage.classList.add('alert-text');
            ElMessage.innerHTML = 'Please enter your task';
            alertBox.appendChild(ElMessage);
            setTimeout(() => {
                alertBox.removeChild(ElMessage); 
            }, 5000);
            saveTasks();
        }
        
    }   
});

inputBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
            const taskText = inputBox.value;
            if (taskText !== '') {
                const task = document.createElement('li');
                task.classList.add('task');
                task.innerHTML = `
                <div class="cont">
                    <input type="checkbox">
                    <span id="task-name">${taskText}</span>
                </div>
                <button class="edit-task">Edit</button>
                <button class="delete-task">X</button></li>
                `;
                taskList.appendChild(task);
                inputBox.value = '';
                inputBox.focus();
                saveTasks();
            }
        }
    })


taskList.addEventListener('click', (event) => {
    const target = event.target;    
    if (target.type === "checkbox") {
        const task = event.target.parentElement;
        task.classList.toggle('checked');
        saveTasks();
    }
    else if (target.tagName === 'SPAN') {
        const task = event.target.parentElement;
        task.classList.toggle('checked');
        const checkbox = event.target.parentElement.querySelector('input[type="checkbox"]') ;
        checkbox.checked = !checkbox.checked;
        saveTasks();
    }
    else if (target.tagName === 'DIV') {
        const task = event.target;
        task.classList.toggle('checked');
        const checkbox = event.target.parentElement.querySelector('input[type="checkbox"]') ;
        checkbox.checked = !checkbox.checked;

        saveTasks();
    }
    else if (target.classList.contains('delete-task')) {
        const task = event.target.parentElement;
        task.remove();

        saveTasks();
    }
});

removeTaskButton.addEventListener('click', () => {
    taskList.innerHTML = '';
    saveTasks();
}

);

searchBox.addEventListener( 'input' ,(e) => {

    const text = e.target.value.toLowerCase();
    const allItem = document.querySelectorAll('.task');
    for (let task of allItem) {
        const item = task.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
        
    };
});

taskList.addEventListener('click', (event) => {
    const target = event.target;
    const task = target.closest('.task');
    if (target.classList.contains('edit-task')) {
        editTask(task.querySelector('.cont'));
    }
})

function editTask(task) {
    const taskName = task.querySelector('#task-name');
    const editButton = task.parentElement.querySelector('.edit-task');
    
    if (editButton.textContent === 'Edit') {

        const input = document.createElement('input');
        input.type = 'text';
        input.value = taskName.textContent;
        input.classList.add('edit-input');

        task.replaceChild(input, taskName);
        editButton.textContent = 'Save';
        saveTasks();
        input.focus();
        input.select();
    } else {
        const input = task.querySelector('.edit-input');
        if (input.value.trim() !== '') {
            const newTaskName = document.createElement('span');
            newTaskName.id = 'task-name';
            newTaskName.textContent = input.value.trim();

            task.replaceChild(newTaskName, input);
            editButton.textContent = 'Edit';
            
            saveTasks();
        } 
    }
}


function saveTasks() {
    localStorage.setItem('data', taskList.innerHTML);
}
function loadTasks() {
    taskList.innerHTML = localStorage.getItem('data');
}
loadTasks();