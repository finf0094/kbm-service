import Sidebar from "./Sidebar.tsx";
import Header from "./Header.tsx";
import './UI/Layout.css'
import { Outlet } from "react-router-dom";




const Layout = () => {

    return (
        <div className="layout">
            <Header />
            <div className='container'>
                <Sidebar/>
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default Layout