export const addTodo = (data) => ({
  type: "todoList/addTodo",
  payload: data,
});

export const searchFilterChange = (text) => ({
  type: "filter/searchFilterChange",
  payload: text,
});

export const statusFilterChange = (status) => ({
  type: "filter/statusFilterChange",
  payload: status,
});

export const priorityFilterChange = (priorities) => ({
  type: "filter/prioritiesFilterChange",
  payload: priorities,
});