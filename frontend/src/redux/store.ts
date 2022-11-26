import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice, loaderSlice } from './features';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
    auth: authSlice,
    loader: loaderSlice,
}));
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)