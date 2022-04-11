export const addTodo = (data) => ({
  type: "todoList/addTodo",
  payload: data,
});

export const toggleTodoStatus = (data) => ({
  type: "todoList/toggleTodoStatus",
  payload: data,
});

export const searchFilterChange = (todoId) => ({
  type: "filter/searchFilterChange",
  id: todoId,
});

export const statusFilterChange = (status) => ({
  type: "filter/statusFilterChange",
  payload: status,
});

export const priorityFilterChange = (priorities) => ({
  type: "filter/prioritiesFilterChange",
  payload: priorities,
});