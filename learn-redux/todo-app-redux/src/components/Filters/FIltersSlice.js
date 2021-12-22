const initState = {
  search: "",
  status: "All",
  priority: [],
};

const filterReducer = (state = initState, action) => {
  console.log(`📕 state, action - 15:FilterSlice.js \n`, state, action);
  switch (action.type) {
    case "filter/searchFilterChange":
      return {
        ...state,
        search: action.payload,
      };

    case "filter/statusFilterChange":
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
