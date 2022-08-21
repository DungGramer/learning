import { useEffect, useReducer } from "react";

const initialState = {
  error: null,
  loading: false,
  result: [],
};

const fetchReducer = (state, action) => {
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

function useFetch(url) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    const fetchUrl = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        dispatch({ type: "RESPONSE_COMPLETE", payload: { response: data } });
      } catch (error) {
        dispatch({ type: "ERROR", payload: { error } });
      }
    };

    fetchUrl();
  }, []);

  return [state.result, state.loading, state.error];
}

export default useFetch;
