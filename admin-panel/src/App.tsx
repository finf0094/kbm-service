import {Route, Routes} from "react-router-dom";
import Layout from "./components/Provider/Layout.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import LoginPage from "./pages/LoginPage.tsx";

import './App.css'
import AddPage from "./pages/AddPage.tsx";
import Departments from "./pages/Lists/Departments.tsx";
import Locations from "./pages/Lists/Locations.tsx";


function App() {

    return (
        <Routes>
            <Route path="/auth" element={<LoginPage/>}/>

            <Route path="/" element={<Layout/>}>

                <Route path="/integration/departments/" element={<Departments/>} />
                <Route path="/integration/locations/" element={<Locations/>} />
                <Route path="/integration/create-location/" element={<AddPage />} />

                {/* ADMIN */}
                <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']}/>}>

                </Route>
            </Route>

        </Routes>
    )
}

export default App
