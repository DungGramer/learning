import { configureStore } from '@reduxjs/toolkit';
import { humansSlice } from './humansSlice';
import { tasksSlice } from './tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    humans: humansSlice.reducer
  }
});
