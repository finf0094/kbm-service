import "./UI/Header.css"
import { useAppDispatch } from "../../hooks/useAppDispatch.ts";
import { logout } from "../../redux/store/authSlice.ts";
import { useNavigate } from "react-router-dom";



const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/auth")
    }
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">KBM administration</div>
                <button className="header__logout" onClick={handleLogout}>Выйти</button>
            </div>
        </header>
    )
}

export default Header;