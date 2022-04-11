// const initState = {
//   search: "",
//   status: "All",
//   priority: [],
// };

// const filterReducer = (state = initState, action) => {
//   console.log(`📕 state, action - 15:FilterSlice.js \n`, state, action);
//   switch (action.type) {
//     case "filter/searchFilterChange":
//       return {
//         ...state,
//         search: action.payload,
//       };

//     case "filter/statusFilterChange":
//       return {
//         ...state,
//         status: action.payload,
//       };

//     case "filter/prioritiesFilterChange":
//       return {
//         ...state,
//         priority: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default filterReducer;

import { createSlice } from "@reduxjs/toolkit";
export default createSlice({
  name: 'filters',
  initialState: {
    search: "",
    status: "All",
    priorities: [],
  },
  reducers: {
    searchFilterChange: (state, action) => {
      state.search = action.payload;
    },
    statusFilterChange: (state, action) => {
      state.status = action.payload;
    },
    prioritiesFilterChange: (state, action) => {
      state.priorities = action.payload;
    }
  }
});