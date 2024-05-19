export const getStorage = (nameUser) => {
  const data = localStorage.getItem(nameUser);
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const setStorage = (userName, task) => {
  const tasks = getStorage(userName);
  tasks.push(task);
  localStorage.setItem(userName, JSON.stringify(tasks));
};

export const removeStorage = (userName, taskId) => {
  const tasks = getStorage(userName).filter((task) => task.id !== taskId);
  localStorage.setItem(userName, JSON.stringify(tasks));
};
