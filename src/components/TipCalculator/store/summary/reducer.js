import { UPDATE_SUMMARY } from './actions';

const initialSummary = {
  subTotal: 0,
  tipAmount: 0,
  total: 0,
};

export const reducer = (state = initialSummary, action) => {
  if (action.type === UPDATE_SUMMARY) {
    const { items, tipPercentage } = action.payload;

    return {
      ...state,
      subTotal: items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      tipAmount: items.reduce((acc, item) => acc + item.price * item.quantity * tipPercentage / 100, 0),
      total: state.subTotal + state.tipAmount,
    }
  }

  return state;
};

export default reducer;
