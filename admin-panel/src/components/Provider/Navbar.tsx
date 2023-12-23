import './UI/Navbar.css';
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {logout} from "../../redux/store/authSlice.ts";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth")
    }

    return (
        <nav className="navbar">
            <div className="title">Django administration</div>
            <div className="user-info">
                <span>Welcome.</span>
                <a href="/site/">View site</a>
                <span> /</span>
                <a href="/password_change/">Change password</a>
                <span> /</span>
                <button onClick={handleLogout}>Log out</button>
            </div>
        </nav>
    );
};

export default Navbar;