export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
export const SET = 'set';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const set = (value) => ({ type: SET, payload: value });
