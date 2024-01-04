import {Route, Routes} from "react-router-dom";

import {
    useCreateLocationMutation,
    useDeleteLocationMutation,
    useGetAllLocationsQuery,
    useGetLocationByIdQuery,
    useUpdateLocationMutation,
    util as locationApiUtil
} from "./redux/api/locationApi.ts";
import {
    useCreateDepartmentMutation,
    useDeleteDepartmentMutation,
    useGetAllDepartmentsQuery,
    useGetDepartmentByIdQuery,
    useUpdateDepartmentMutation,
    util as departmentApiUtil
} from "./redux/api/departmentApi.ts";
import {
    useCreatePositionMutation,
    useDeletePositionMutation,
    useGetAllPositionsQuery,
    useGetPositionByIdQuery,
    useUpdatePositionMutation,
    util as positionApiUtil
} from "./redux/api/positionApi.ts";

import AddItemPage from "./pages/item/AddItemPage.tsx";
import ItemListPage from "./pages/item/ItemListPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ItemPage from "./pages/item/ItemPage.tsx";
import UserListPage from "./pages/user/UserListPage.tsx";
import UserDetailPage from "./pages/user/UserDetailPage.tsx";
import PermissionsPage from "./pages/PermissionsPage.tsx";

import RequireAuth from "./components/auth/RequireAuth.tsx";
import Layout from "./components/Provider/Layout.tsx";

import './App.css'
import AddCuratorPage from "./pages/item/AddCuratorPage.tsx";
import CuratorEditPage from "./pages/item/CuratorEditPage.tsx";
import { useGetAllCuratorsQuery } from "./redux/api/curatorApi.ts";
import PolicyPage from "./pages/PolicyPage.tsx";
import UserAddPage from "./pages/user/UserAddPage.tsx";



function App() {

    const navigate = (url: string) => {
        window.location.href = url;
    }

    return (
        <Routes>


            <Route path="/auth" element={<LoginPage/>}/>

            {/* ADMIN */}
            <Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']}/>}>

                <Route path="/" element={<Layout/>}>

                    <Route path="/integration/locations/" element={
                        <ItemListPage
                            key="locations"
                            queryFn={useGetAllLocationsQuery}
                            title="локации"
                        />}
                    />
                    <Route path="/integration/policies/" element={ <PolicyPage /> }/>
                    <Route path="/integration/departments/" element={
                        <ItemListPage
                            key="departments"
                            queryFn={useGetAllDepartmentsQuery}
                            title="департамент"
                        />}
                    />
                    <Route path="/integration/positions/" element={
                        <ItemListPage
                            key="positions"
                            queryFn={useGetAllPositionsQuery}
                            title="позиции"
                        />}
                    />
                    <Route path="/integration/curators/" element={
                        <ItemListPage
                            key="curators"
                            queryFn={useGetAllCuratorsQuery}
                            title="кураторов"
                        />}
                    />


                    <Route path="/integration/locations/:id" element={
                        <ItemPage
                            queryFn={useGetLocationByIdQuery}
                            relatedQueryFn={useGetAllDepartmentsQuery}
                            delQueryFn={useDeleteLocationMutation}
                            updateMutationFn={useUpdateLocationMutation}
                            title="локации"
                            relatedTitle="Департаменты"
                            apiUtil={locationApiUtil}
                        />}
                    />
                    <Route path="/integration/departments/:id" element={
                        <ItemPage
                            queryFn={useGetDepartmentByIdQuery}
                            relatedQueryFn={useGetAllPositionsQuery}
                            delQueryFn={useDeleteDepartmentMutation}
                            updateMutationFn={useUpdateDepartmentMutation}
                            title="департамент"
                            relatedTitle="Позиции"
                            apiUtil={departmentApiUtil}
                        />}
                    />
                    <Route path="/integration/positions/:id" element={
                        <ItemPage
                            queryFn={useGetPositionByIdQuery}
                            delQueryFn={useDeletePositionMutation}
                            updateMutationFn={useUpdatePositionMutation}
                            title="позиции"
                            apiUtil={positionApiUtil}
                        />}
                    />
                    <Route path="/integration/curators/:id" element={
                        <CuratorEditPage />}
                    />

                    <Route path="/auth/users/add" element={ <UserAddPage /> } />
                    <Route path="/integration/locations/add" element={
                        <AddItemPage
                            mutationFn={useCreateLocationMutation}
                            onItemAdded={(item) => {
                                console.log('Location added:', item);
                                navigate(`${window.location.origin}/integration/locations`);
                            }}
                            queryFn={useGetAllLocationsQuery}
                            transformInput={(name) => name}
                            title="Локация"
                            apiUtil={locationApiUtil}
                        />}
                    />
                    <Route path="/integration/departments/add" element={
                        <AddItemPage
                            mutationFn={useCreateDepartmentMutation}
                            onItemAdded={(item) => {
                                console.log('Department added:', item);
                                navigate(`${window.location.origin}/integration/departments`);
                            }}
                            queryFn={useGetAllLocationsQuery} // Для создания департамента, выбираем локацию
                            transformInput={(name, parentId) => ({name, locationId: parentId})}
                            title="Департамент" // Для департаментов преобразуем parentId в locationId
                            apiUtil={departmentApiUtil}
                        />}
                    />
                    <Route path="/integration/positions/add" element={
                        <AddItemPage
                            mutationFn={useCreatePositionMutation}
                            onItemAdded={(item) => {
                                console.log('Position added:', item);
                                navigate(`${window.location.origin}/integration/positions`);
                            }}
                            queryFn={useGetAllDepartmentsQuery} // Для создания позиции, выбираем департамент
                            transformInput={(name, parentId) => ({name, departmentId: parentId})}
                            title="Позиции" // Для позиций преобразуем parentId в departmentId
                            apiUtil={positionApiUtil}
                        />}
                    />
                    <Route path="/integration/curators/add" element={ <AddCuratorPage />} />

                    <Route path="/auth/users" element={<UserListPage/>}/>
                    <Route path="/auth/users/:id" element={<UserDetailPage/>}/>
                    <Route path="/auth/permissions" element={<PermissionsPage/>}/>

                </Route>
            </Route>

        </Routes>
    )
}

export default App
