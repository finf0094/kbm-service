import React from "react";
import Sidebar from "./Sidebar.tsx";
import './UI/Layout.css'
import Navbar from "./Navbar.tsx";


interface ILayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {

    return (
        <>
            <Navbar />
            <div className='container'>
                <Sidebar/>
                <div className='main-content'>
                    {children}
                </div>
            </div>
        </>

    )
}

export default Layout