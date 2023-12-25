import {Route, Routes, useNavigate} from "react-router-dom";

import {useCreateLocationMutation, useGetAllLocationsQuery} from "./redux/api/locationApi.ts";
import {useCreateDepartmentMutation, useGetAllDepartmentsQuery} from "./redux/api/departmentApi.ts";

import AddItemPage from "./pages/AddItemPage.tsx";
import ItemListPage from "./pages/ItemListPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

import RequireAuth from "./components/auth/RequireAuth.tsx";
import Layout from "./components/Provider/Layout.tsx";

import './App.css'
import {useCreatePositionMutation, useGetAllPositionsQuery} from "./redux/api/positionApi.ts";



function App() {

    const navigate = (url: string) => {
        window.location.href = url;
    }

    return (
        <Routes>
            <Route path="/auth" element={<LoginPage/>}/>

            <Route path="/" element={<Layout/>}>

                <Route path="/integration/locations/" element={
                    <ItemListPage
                        key="locations"
                        queryFn={useGetAllLocationsQuery}
                        title="Location"
                    />}
                />
                <Route path="/integration/departments/" element={
                    <ItemListPage
                        key="departments"
                        queryFn={useGetAllDepartmentsQuery}
                        title="Department"
                    />}
                />
                <Route path="/integration/positions/" element={
                    <ItemListPage
                        key="positions"
                        queryFn={useGetAllPositionsQuery}
                        title="Position"
                    />}
                />


                <Route path="/integration/locations/add" element={
                    <AddItemPage
                        mutationFn={useCreateLocationMutation}
                        onItemAdded={(item) => { console.log('Location added:', item); navigate('http://localhost:5173/integration/locations') }}
                        queryFn={useGetAllLocationsQuery}
                        transformInput={(name) => name} 
                        title="Локация"
                    />}
                />
                <Route path="/integration/departments/add" element={
                    <AddItemPage
                        mutationFn={useCreateDepartmentMutation}
                        onItemAdded={(item) => { console.log('Department added:', item); navigate('http://localhost:5173/integration/departments'); }}
                        queryFn={useGetAllLocationsQuery} // Для создания департамента, выбираем локацию
                        transformInput={(name, parentId) => ({ name, locationId: parentId })}
                        title="Департамент" // Для департаментов преобразуем parentId в locationId
                    />}
                />
                <Route path="/integration/positions/add" element={
                    <AddItemPage
                        mutationFn={useCreatePositionMutation}
                        onItemAdded={(item) => { console.log('Position added:', item); navigate('http://localhost:5173/integration/positions'); }}
                        queryFn={useGetAllDepartmentsQuery} // Для создания позиции, выбираем департамент
                        transformInput={(name, parentId) => ({ name, departmentId: parentId })}
                        title="Позиции" // Для позиций преобразуем parentId в departmentId
                    />}
                />

                {/* ADMIN */}
                <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']}/>}>

                </Route>
            </Route>

        </Routes>
    )
}

export default App
