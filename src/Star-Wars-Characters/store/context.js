export const initialState = {
  error: null,
  loading: false,
  result: [],
};

export const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      result: [],
      loading: true,
      error: null,
    };
  }

  if (action.type === "RESPONSE_COMPLETE") {
    return {
      result: action.payload.response,
      loading: false,
      error: null,
    };
  }

  if (action.type === "ERROR") {
    return {
      result: [],
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};
