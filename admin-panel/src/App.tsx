import {Route, Routes} from "react-router-dom";
import Layout from "./components/Provider/Layout.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import LoginPage from "./pages/LoginPage.tsx";

import './App.css'

function App() {

    return (
        <Routes>
            <Route path="/auth" element={<LoginPage/>}/>

            <Route path="/" element={<Layout/>}>

                {/* ADMIN */}
                <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']}/>}>

                </Route>
            </Route>

        </Routes>
    )
}

export default App
