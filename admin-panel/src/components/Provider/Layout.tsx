import {Outlet} from "react-router-dom";

import Sidebar from "./Sidebar.tsx";
import Navbar from "./Navbar.tsx";

import './UI/Layout.css'




const Layout = () => {

    return (
        <>
            <Navbar />
            <div className='container'>
                <Sidebar/>
                <div className='main-content'>
                    <Outlet />
                </div>
            </div>
        </>

    )
}

export default Layout