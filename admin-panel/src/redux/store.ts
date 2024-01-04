import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {setupListeners} from "@reduxjs/toolkit/query";


// REDUCER
import authReduces from "./store/authSlice.ts";
import {authApi} from "./api/authApi.ts";
import {locationApi} from "./api/locationApi.ts";
import {departmentApi} from "./api/departmentApi.ts";
import {positionApi} from "./api/positionApi.ts";
import {userApi} from "./api/userApi.ts";
import { curatorApi } from './api/curatorApi.ts';

// API

// Объединение редьюсеров с поддержкой Redux Persist
const rootReducer = combineReducers({
    auth: authReduces,
    [authApi.reducerPath]: authApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [departmentApi.reducerPath]: departmentApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [curatorApi.reducerPath]: curatorApi.reducer
});

// Создание хранилища
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            authApi.middleware,locationApi.middleware, departmentApi.middleware, positionApi.middleware,
            userApi.middleware,curatorApi.middleware
        ),
});

// Настройка Redux Toolkit Query listeners
setupListeners(store.dispatch);

// Создание объекта persistor для Redux Persist

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Экспорт хранилища и persistor
export { store };