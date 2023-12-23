import useAuth from "../../hooks/useAuth.ts";
import Header from "./Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "./Footer.tsx";

function Layout() {
    const auth = useAuth();

    return (
        <div className='App'>
            <Header data={{ itin: auth.user.itin, isAuthenticated: auth.isAuthenticated, email: auth.user.email, roles: auth.user.roles }} />
            <Outlet />
            <Footer />
        </div>

    )
}

export default Layout