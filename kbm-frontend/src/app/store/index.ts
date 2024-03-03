// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import { setupListeners } from '@reduxjs/toolkit/query/react';

// REDUCER
// import quizSessionReducer from "./slices/quizSessionSlice.ts";
// import applicationReducer from './slices/applicationSlice.ts';
import modalReducer from '../providers/modal-provider/lib/modalSlice';
import authReducer from '@/features/auth/by-itin/model/slices/authSlice';
import { userApi } from '@/entities/user/api'
// import quizReducer from "./slices/quizCreateSlice.ts";

// API
// import { authApi } from './api/authApi.ts';
// import { userApi } from './api/userApi.ts';
// import { applicationApi } from './api/applicationApi.ts';
// import { locationApi } from "./api/position/locationApi.ts";
// import { departmentApi } from "./api/position/departmentApi.ts";
// import { positionApi } from "./api/position/positionApi.ts";
// import { quizApi } from "./api/quizApi.ts";
// import { quizSessionApi } from "./api/quizSessionApi.ts";
// import { moderatorApi } from "./api/moderatorApi.ts";
// import { reportApi } from './api/reportApi.ts';
// import { policyApi } from './api/policyApi.ts';
// import { curatorApi } from './api/curatorApi.ts';


// Конфигурация Redux Persist
// const persistConfig = {
//     key: 'root',
//     storage,
// };

// Объединение редьюсеров с поддержкой Redux Persist
const rootReducer = combineReducers({
    auth: authReducer,
    modal: modalReducer,
    // application: persistReducer(persistConfig, applicationReducer),
    // quizCreate: quizReducer,
    // quizSession: quizSessionReducer,
    // [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    // [applicationApi.reducerPath]: applicationApi.reducer,
    // [locationApi.reducerPath]: locationApi.reducer,
    // [departmentApi.reducerPath]: departmentApi.reducer,
    // [positionApi.reducerPath]: positionApi.reducer,
    // [quizApi.reducerPath]: quizApi.reducer,
    // [quizSessionApi.reducerPath]: quizSessionApi.reducer,
    // [moderatorApi.reducerPath]: moderatorApi.reducer,
    // [reportApi.reducerPath]: reportApi.reducer,
    // [policyApi.reducerPath]: policyApi.reducer,
    // [curatorApi.reducerPath]: curatorApi.reducer,
});

// Создание хранилища
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            userApi.middleware,
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
