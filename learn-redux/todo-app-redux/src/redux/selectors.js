export const todoListSelector = (state) => {
  const searchText = searchTextSelector(state);

  const todoRemaining = state.todoList.filter((todo) =>
    todo.name.includes(searchText)
  );
  
  return todoRemaining;
};

export const searchTextSelector = (state) => state.filters.search;
