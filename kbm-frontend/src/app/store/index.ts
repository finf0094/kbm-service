import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import storage from 'redux-persist/lib/storage';

// REDUCER
import applicationReducer from '@/entities/application/slices/applicationSlice';
import modalReducer from '../providers/modal-provider/lib/modalSlice';
import authReducer from '@/features/auth/by-itin/model/slices/authSlice';

import persistReducer from 'redux-persist/es/persistReducer'

// API
import { userApi } from '@/entities/user/api'
import { policyApi } from '@/entities/policy/api'
import { applicationApi } from '@/entities/application/api'
import { positionApi } from '@/entities/position/api'


// Конфигурация Redux Persist
const persistConfig = {
    key: 'root',
    storage,
};

// Объединение редьюсеров с поддержкой Redux Persist
const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    application: persistReducer(persistConfig, applicationReducer),
    // quizCreate: quizReducer,
    // quizSession: quizSessionReducer,
    // [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [positionApi.reducerPath]: positionApi.reducer,
    // [quizApi.reducerPath]: quizApi.reducer,
    // [quizSessionApi.reducerPath]: quizSessionApi.reducer,
    // [moderatorApi.reducerPath]: moderatorApi.reducer,
    // [reportApi.reducerPath]: reportApi.reducer,
    [policyApi.reducerPath]: policyApi.reducer,
    // [curatorApi.reducerPath]: curatorApi.reducer,
});

// Создание хранилища
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            userApi.middleware, policyApi.middleware, applicationApi.middleware,
            positionApi.middleware,
        ),
});

// Настройка Redux Toolkit Query listeners
setupListeners(store.dispatch);

// Создание объекта persistor для Redux Persist
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Экспорт хранилища и persistor
export { store, persistor };
