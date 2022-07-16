import { createStore } from 'redux';

const initState = { value: 0 };

const INCREMENT = 'counter/increment';
const ADD = 'ADD';

const incrementAction = { type: 'INCREMENT' };

// Creator
const increment = () => ({ type: INCREMENT });
const add = (amount) => ({ type: ADD, payload: amount });

const reduce = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        value: state.value + 1,
      };
    case 'ADD':
      return { value: state.value + action.payload };

    default:
      return state;
  }
};

const store = createStore(reduce);

console.log(`📕 store - 13:createStore.js \n`, store);
