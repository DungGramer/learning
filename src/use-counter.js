import { useSelector } from 'react-redux';
import { useActions } from './use-actions';
import { decrement, increment, set } from "./actions";

export const useCounter = () => {
  const count = useSelector((state) => state.count);
  const actions = useActions({ increment, decrement, set });

  return { count, ...actions };
};
