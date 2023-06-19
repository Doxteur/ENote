import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/AuthReducer';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});