import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import weatherReducer from './slices/weatherSlice';
import favoritesReducer from './slices/favoritesSlice';
import searchReducer from './slices/searchSlice';

const rootReducer = combineReducers({
    weather: weatherReducer,
    favorites: favoritesReducer,
    search: searchReducer,
});

const persistConfig = { key: 'root', storage: AsyncStorage, whitelist: ['favorites', 'search'] };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
