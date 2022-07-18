import { applyMiddleware } from 'redux';
import { compose } from 'redux';
import { createStore } from 'redux';

const reducer = (state = { count: 1 }) => state;

// const monitorEnhancer = (createStore) => (reducer, initialState, enhancer) => {
//   const monitoredReducer = (state, action) => {
//     const start = performance.now();
//     const newState = reducer(state, action);
//     const end = performance.now();
//     const diff = end - start;
//     console.log(diff);

//     return newState;
//   };

//   return createStore(monitoredReducer, initialState, enhancer);
// };

// const logEnhancer = (createStore) => (reducer, initialState, enhancer) => {
//   const logReducer = (state, action) => {
//     console.log('old sate', state);
//     const newState = reducer(state, action);
//     console.log('new state', state, action);

//     return newState;
//   };

//   return createStore(logReducer, initialState, enhancer);
// };

// const store = createStore(reducer, {}, monitorEnhancer);
// const store = createStore(reducer, compose(logEnhancer, monitorEnhancer));

const logMiddleware = (store) => (next) => (action) => {
  console.log('old state', store.getState(), action);
  next(action);
  console.log('new state', store.getState(), action);
};

const monitorMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  next(action);
  const end = performance.now();
  const diff = end - start;
  console.log(diff);
};

const store = createStore(
  reducer,
  applyMiddleware(logMiddleware, monitorMiddleware)
);

store.dispatch({ type: 'Hello' });
