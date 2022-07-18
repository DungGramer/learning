import { combineReducers } from 'redux';
import { createStore } from 'redux';

const initState = {
  users: [
    { id: 1, name: 'Steve' },
    { id: 2, name: 'Eric' },
  ],
  tasks: [
    { title: 'File the TPS reports' },
    { title: 'Order more energy drinks' },
  ],
};

const ADD_USER = 'ADD_USER';
const ADD_TASK = 'ADD_TASK';

const addTask = (title) => ({ type: ADD_TASK, payload: title });
const addUser = (name) => ({ type: ADD_USER, payload: name });

const userReducer = (users = initState.users, action) => {
  if (action.type === ADD_USER) {
    return [...users, action.payload];
  }

  return users;
};

const taskReducer = (tasks = initState.tasks, action) => {
  if (action.type === ADD_TASK) {
    return [...tasks, action.payload];
  }

  return tasks;
};

const reducer = combineReducers({ users: userReducer, tasks: taskReducer });

const store = createStore(reducer);

console.log(store.getState());