import { createSelector } from "reselect";

export const searchTextSelector = (state) => state.filters.search;
export const todoListSelector = (state) => state.todoList;

// export const todoListSelector = (state) => {
//   const searchText = searchTextSelector(state);

//   const todoRemaining = state.todoList.filter((todo) =>
//     todo.name.includes(searchText)
//   );

//   return todoRemaining;
// };

export const todoRemainingSelector = createSelector(
  todoListSelector,
  searchTextSelector,
  (todoList, searchText) => {
    return todoList.filter((todo) => todo.name.includes(searchText));
  }
);
