import { createStore } from "redux";
const initState = {
  value: 0
}

const reduce = (state, action) => {
  return state;
}

const store = createStore(reduce);

console.log(`📕 store - 13:createStore.js \n`, store);