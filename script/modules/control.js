import {
  createForm,
  createTask,
  createTable,
  wrapperTable,
  createTitle,
  container,
} from './createElement.js';
import {renderTasks, addDeleteHandler, completeTask} from './render.js';
import {getStorage, setStorage} from './serviceStorage.js';

const formObject = createForm();
export const {form, input, submitButton, resetButton} = formObject;

const taskObject = createTask();
export let {row, tableLight, description, deleteButton, completeButton} = taskObject;

const tableWrapper = wrapperTable(form);
export const {table, tbody} = createTable(tableWrapper);

export let state = {
  numberTask: 0,
  userName: '',
};

const clearAppContainer = () => {
  container.innerHTML = '';
  createTitle();
};

export const authorization = () => {
  state.userName = prompt('Введите имя пользователя');

  const nameCheck = /^[a-zA-Zа-яА-ЯёЁ]+$/;
  if (!nameCheck.test(state.userName)) {
    alert('Имя пользователя не может быть пустым и должно содержать только буквы.');
    authorization();
    return;
  }

  if (!state.userName || !state.userName.trim()) {
    clearAppContainer();
    return;
  } else {
    const storedTasks = getStorage(state.userName);

    createTitle();
    formControl();
    if (storedTasks.length > 0) {
      renderTasks(storedTasks);
    }
  }
};

export const updateTaskStatusInStorage = (userName, taskId, newStatus) => {
  const tasks = getStorage(userName);
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === taskId) {
      tasks[i].status = newStatus;
      break;
    }
  }
  localStorage.setItem(userName, JSON.stringify(tasks));
};

export const formControl = () => {
  submitButton.disabled = true;

  input.addEventListener('input', () => {
    if (input.value.trim().length > 0) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  });

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    addTask();
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTask();
    }
  });

  const clearTasks = (userName) => {
    localStorage.setItem(userName, JSON.stringify([]));
  };

  const addTask = () => {
    state.numberTask++;

    const taskValue = input.value.trim();
    const taskId = Math.random().toString().substring(2, 10);

    if (state.numberTask === 1) {
      table.style.display = 'table';
    }
    const newRow = document.createElement('tr');
    newRow.className = 'table-light';
    newRow.innerHTML = `
       <td>${state.numberTask}</td>
       <td class="task">${input.value}</td>
       <td class="status">В процессе</td>
       <td>
         <button class="btn btn-danger">
           Удалить
         </button>
         <button class="btn btn-success">
           Завершить
         </button>
       </td>
     `;

    tbody.appendChild(newRow);

    const deleteButton = newRow.querySelector('.btn-danger');
    addDeleteHandler(deleteButton, taskId);

    const completeBut = newRow.querySelector('.btn-success');
    completeTask(completeBut, taskId);

    setStorage(state.userName, {id: taskId, task: taskValue, status: 'В процессе'});

    input.value = '';
    submitButton.disabled = true;
  };

  resetButton.addEventListener('click', (e) => {
    e.preventDefault();
    state.numberTask = 0;
    tbody.innerHTML = '';
    table.style.display = 'none';

    clearTasks(state.userName);
  });
};
