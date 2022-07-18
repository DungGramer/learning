import { compose } from 'redux';
import { bindActionCreators } from 'redux';
import { createStore } from 'redux';

const initState = { value: 0 };

const INCREMENT = 'counter/increment';
const ADD = 'ADD';

const incrementAction = { type: 'INCREMENT' };

// Creator
const increment = () => ({ type: INCREMENT });
const add = (amount) => ({ type: ADD, payload: amount });

const reducer = (state = initState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1 };
    case ADD:
      return { value: state.value + action.payload };

    default:
      return state;
  }
};

const store = createStore(reducer);

const subscriber = () => console.log('SUBSCRIBER', store.getState());

store.subscribe(subscriber);

// store.dispatch(add(1000));
// store.dispatch(increment());

// const [dispatchIncrement, dispatchAdd] = [increment, add].map(fn => compose(store.dispatch, fn));
const actions = bindActionCreators({ increment, add }, store.dispatch);

actions.add(1000);
actions.increment();

console.log(`📕 store - 13:createStore.js \n`, store.getState());
