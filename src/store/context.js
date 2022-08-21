export const initialState = {
  error: null,
  loading: false,
  characters: [],
};

export const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      characters: [],
      loading: true,
      error: null,
    };
  }

  if (action.type === "RESPONSE_COMPLETE") {
    return {
      characters: action.payload.hits,
      loading: false,
      error: null,
    };
  }

  if (action.type === "ERROR") {
    return {
      characters: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};
