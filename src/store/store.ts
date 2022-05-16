import { configureStore } from '@reduxjs/toolkit';
import listReducer from '../features/lists/listSlice';

export const store = configureStore({
  reducer: {
    data: listReducer
  }
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
