import { configureStore } from '@reduxjs/toolkit';
import stockReducer from '../slices/stock'
import stockPriceReducer from '../slices/prices'

export const store = configureStore({
  reducer: {
    stockReducer,
    stockPriceReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;