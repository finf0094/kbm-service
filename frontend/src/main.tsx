import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";

import {Provider} from "react-redux";
import {store, persistor} from "./redux/store.ts";

import App from './App.tsx'
import ModalProvider from "./providers/ModalProvider.tsx";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>

                <ModalProvider/>
                <ToastContainer/>

                <PersistGate loading={null} persistor={persistor}>
                    <Routes>
                        <Route path="/*" element={<App/>}/>
                    </Routes>
                </PersistGate>

            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
