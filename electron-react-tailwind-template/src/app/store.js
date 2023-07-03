import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/AuthReducer';
import NotesReducer from '../features/Notes/NotesReducer';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    notes: NotesReducer
  },
});
