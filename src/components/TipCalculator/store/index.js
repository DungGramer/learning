import { combineReducers, createStore } from 'redux';
import itemsReducer from './items/reducer';
import tipPercentageReducer from './tip-percentage/reducer';
import summaryReducer from './summary/reducer';

const reducer = combineReducers({
  items: itemsReducer,
  tipPercentage: tipPercentageReducer,
  summary: summaryReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

export default store;