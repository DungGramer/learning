export const addTodo = (data) => ({
  type: "todoList/addTodo",
  payload: data,
});

export const searchFilterChange = (text) => ({
  type: "filter/searchFilterChange",
  payload: text,
});