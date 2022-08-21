import { useCallback, useReducer } from "react";

function useThunkReducer(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback((action) => {
    if (action instanceof Function) {
      action(dispatch);
    }

    dispatch(action);
  }, []);

  return [state, enhancedDispatch];
}

export default useThunkReducer;
