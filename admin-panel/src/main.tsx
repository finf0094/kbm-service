import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";

import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>

            <ToastContainer />

                <BrowserRouter>
                    <Routes>
                        <Route path="/*" element={<App/>} />
                    </Routes>
                </BrowserRouter>


        </Provider>
    </React.StrictMode>,
)
