import {state, table, tbody, updateTaskStatusInStorage} from './control.js';
import {removeStorage} from './serviceStorage.js';

export const renderTasks = (tasks) => {
  tasks.forEach((task) => {
    state.numberTask++;

    if (state.numberTask === 1) {
      table.style.display = 'table';
    }
    const newRow = document.createElement('tr');
    newRow.className = task.status === 'В процессе' ? 'table-light' : 'table-success';
    newRow.innerHTML = `
        <td>${state.numberTask}</td>
        <td class="task">${task.task}</td>
        <td class="status">${task.status}</td>
        <td>
          <button class="btn btn-danger">
            Удалить
          </button>
          <button class="btn btn-success">
            Завершить
          </button>
        </td>
      `;

    if (task.status === 'Выполнена') {
      const taskElement = newRow.querySelector('.task');
      taskElement.classList.add('text-decoration-line-through');
    }

    tbody.appendChild(newRow);

    const deleteButton = newRow.querySelector('.btn-danger');
    addDeleteHandler(deleteButton, task.id);

    const completeBut = newRow.querySelector('.btn-success');
    completeTask(completeBut, task.id);
  });
};

export const addDeleteHandler = (button, taskId) => {
  button.addEventListener('click', (e) => {
    const target = e.target;
    const row = target.closest('tr');
    row.remove();
    removeStorage(state.userName, taskId);
    updateTaskNumbers();
    if (state.numberTask === 0) {
      table.style.display = 'none';
    }
  });
};

export const completeTask = (button, taskId) => {
  button.addEventListener('click', (e) => {
    const target = e.target;
    const row = target.closest('tr');
    row.classList.add('table-success');
    row.classList.remove('table-light');

    const taskElement = row.querySelector('.task');
    taskElement.classList.add('text-decoration-line-through');

    const statusTask = row.querySelector('.status');
    statusTask.textContent = 'Выполнена';

    updateTaskStatusInStorage(state.userName, taskId, 'Выполнена');
  });
};

export const updateTaskNumbers = () => {
  const rows = tbody.querySelectorAll('tr');
  let number = 1;
  rows.forEach((row) => {
    row.cells[0].textContent = number++;
  });
  state.numberTask = rows.length;
};
