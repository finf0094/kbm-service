import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UI/HeaderList.css";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice.ts";

interface HeaderListProps {
    data: {
        itin: string;
        email: string;
        isAuthenticated: boolean;
        isListOpened: boolean;
        closeList: () => void; // Function to toggle the list
        roles?: string[]; // Make 'roles' property optional
    };
}

const HeaderList: React.FC<HeaderListProps> = ({ data }) => {
    const [animationClass, setAnimationClass] = useState("");
    const dispatch = useDispatch();

    const handleToggleList = () => {
        if (data.isListOpened) {
            // Closing animation
            setAnimationClass("closing-animation");
            setTimeout(() => {
                // After the animation is complete, reset animation class and close the list
                setAnimationClass("");
                data.closeList();
            }, 300); // Adjust the timeout duration to match your animation duration
        } else {
            // Opening animation
            setAnimationClass("opening-animation");
            data.closeList();
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        handleToggleList();
    }

    const modalClass = data.isListOpened ? "list-open" : "list-closed";

    return (
        <div className={`header__list ${modalClass} ${animationClass}`}>
            {data.isAuthenticated ? (
                <div className="list__wrapper">
                    <button className="list__close" onClick={handleToggleList}>
                        <i className="uil uil-times"></i>
                    </button>
                    <div className="list__profile">
                        <img
                            src="https://i.imgur.com/1pS9Squ.png"
                            alt="Profile Icon"
                            className="list__profile-icon"
                        />
                        <div className="list__profile-info">
                            <div>{data.itin}</div>
                            <div>{data.email}</div>
                        </div>
                    </div>
                    <ul className="list__items">
                        <li className="list__items-content">
                            <Link to="/profile" className="list__item" onClick={handleToggleList}>
                                <i className="uil uil-user-circle list__icon"></i>
                                <div className="list__item-link">Профиль</div>
                            </Link>
                            {data.roles && Array.isArray(data.roles) && data.roles.includes('ROLE_USER') && (
                                <>
                                    <Link to="/application-page" className="list__item" onClick={handleToggleList}>
                                        <i className="uil uil-clipboard-notes list__icon"></i>
                                        <div className="list__item-link">Моя заявка</div>
                                    </Link>
                                    <Link to="/quiz-sessions" className="list__item" onClick={handleToggleList}>
                                        <i className="uil uil-clipboard-notes list__icon"></i>
                                        <div className="list__item-link">Тестирование</div>
                                    </Link>
                                </>
                            )}
                        </li>
                        {data.roles && data.roles.includes('ROLE_MODERATOR') &&
                            (<li className="list__items-content">
                                <Link to="/moderation" className="list__item" onClick={handleToggleList}>
                                    <i className="uil uil-user-md list__icon"></i>
                                    <div className="list__item-link">Модерация</div>
                                </Link>
                            </li>)}
                        <li className="list__items-content">
                            <button className="list__item" onClick={handleLogout}>
                                <i className="uil uil-signout list__icon list__icon-logout"></i>
                                <div className="list__items-link">Выйти</div>
                            </button>
                        </li>
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

export default HeaderList;
