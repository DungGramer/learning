export const UPDATE_SUMMARY = 'UPDATE_SUMMARY';

export const updateSummary = (items, tipPercentage) => ({
  type: UPDATE_SUMMARY,
  payload: { items, tipPercentage },
});
