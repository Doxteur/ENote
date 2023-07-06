import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../features/Auth/AuthReducer';
import NotesReducer from '../features/Notes/NotesReducer';
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";
import persistCombineReducers from "redux-persist/es/persistCombineReducers";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
	key: "auth",
	storage,
	whitelist: ["auth","notes"],
};

const rootReducer = persistCombineReducers(persistConfig, {
	auth: AuthReducer,
	notes: NotesReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk, logger],
});

export const persistor = persistStore(store);