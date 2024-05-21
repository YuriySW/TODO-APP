export const container = document.querySelector('.app-container');
container.className = 'vh-100 w-100 d-flex align-items-center justify-content-center flex-column';

export const createTitle = (userName) => {
  const h1 = document.createElement('h1');
  h1.textContent = userName.charAt(0).toUpperCase() + userName.slice(1);

  container.insertBefore(h1, container.firstChild);
  return h1;
};

export const createForm = () => {
  const form = document.createElement('form');
  if (container.querySelector('form')) {
    return;
  }

  form.className = 'd-flex align-items-center mb-3';
  form.insertAdjacentHTML(
    'beforeend',
    `   <label class="form-group me-3 mb-0">
      <input type="text" class="form-control" placeholder="ввести задачу">
    </label>

    <button type="submit" class="btn btn-primary me-3">
      Сохранить
    </button>

    <button type="reset" class="btn btn-warning">
      Очистить
    </button>`
  );

  container.appendChild(form);

  const formObject = {
    form: form,
    input: form.querySelector('.form-control'),
    submitButton: form.querySelector('.btn-primary'),
    resetButton: form.querySelector('.btn-warning'),
  };

  return formObject;
};

export const wrapperTable = (form) => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');
  form.insertAdjacentElement('afterend', tableWrapper);
  return tableWrapper;
};

export const createTable = (tableWrapper) => {
  const table = document.createElement('table');
  table.className = 'table table-hover table-bordered';
  table.style.display = 'none';
  table.insertAdjacentHTML(
    'beforeend',
    `<thead>
           <tr>
             <th>№</th>
             <th>Задача</th>
             <th>Статус</th>
             <th>Действия</th>
           </tr>
         </thead> `
  );

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  tableWrapper.appendChild(table);

  return {tbody, table};
};

export const createTask = () => {
  const tbody = document.createElement('tbody');
  tbody.insertAdjacentHTML(
    'beforeend',
    `
   <tbody>
     <tr class="table-light">
       <td>1</td>
       <td class="task">
       </td>
       <td>В процессе</td>
       <td>
         <button class="btn btn-danger">
           Удалить
         </button>
         <button class="btn btn-success">
           Завершить
         </button>
       </td>
     </tr> `
  );

  const taskRow = tbody.querySelector('tr');
  const tableLight = tbody.querySelector('.table-light');
  const taskDescription = taskRow.querySelector('.task').textContent;
  const deleteButton = taskRow.querySelector('.btn-danger');
  const completeButton = taskRow.querySelector('.btn-success');

  const taskObject = {
    row: taskRow,
    tableLight: tableLight,
    description: taskDescription,
    deleteButton: deleteButton,
    completeButton: completeButton,
  };

  return taskObject;
};
