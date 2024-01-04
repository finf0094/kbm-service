import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./UI/Header.css";
import { useDispatch } from "react-redux";
import HeaderList from "./HeaderList";
import { useTranslation } from "react-i18next";
import NavList from "./NavList";
import { openModal } from "../../redux/slices/modalSlice.ts";
import PhoneNumberFormatter from "../utils/PhoneNumberFormatter.tsx";

interface HeaderProps {
    data: {
        itin: string;
        email: string;
        isAuthenticated: boolean;
        roles: string[];
    };
}

const Header: React.FC<HeaderProps> = ({ data }) => {
    const numberPhone = "+77777777777";
    const { t, i18n } = useTranslation();


    useEffect(() => {
        const fixedHeader = () => {
            if (window.scrollY >= 50) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        };

        window.addEventListener("scroll", fixedHeader);
        window.removeEventListener("load", fixedHeader);

        return () => {
            window.removeEventListener("scroll", fixedHeader);
        };
    }, []);

    const dispatch = useDispatch();

    const handleRegisterModal = () => {
        dispatch(openModal({ id: "registerModal" }));
    };

    const handleLoginModal = () => {
        dispatch(openModal({ id: "loginModal" }));
    };

    const openHeaderList = () => {
        setIsHeaderListOpen(true);
    };

    // Define a function to close the list
    const closeHeaderList = () => {
        setIsHeaderListOpen(false);
    };

    const openNavList = () => {
        setIsNavListOpen(true);
    };

    // Define a function to close the list
    const closeNavList = () => {
        setIsNavListOpen(false);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLanguage = event.target.value;
        i18n.changeLanguage(selectedLanguage);
    };

    const [fixed, setFixed] = useState<boolean>(false);
    const [isHeaderListOpen, setIsHeaderListOpen] = useState<boolean>(false);
    const [isNavListOpen, setIsNavListOpen] = useState<boolean>(false);

    return (
        <header className={fixed ? "header fixed" : "header"}>
            <div className="header__wrapper">
                <nav className="nav">
                    <div className="header__logo">
                        <img
                            src="https://i.imgur.com/dZHVCmo.png"
                            alt=""
                            className="header__logo-img"
                        />
                    </div>
                    <ul className="nav__list">
                        {data.roles && data.roles.includes("ROLE_USER") ? (
                            <div className="header__links">
                                <li className="nav__item"><Link to="/" className="nav__link"> {t("header_about_link")}</Link></li>
                                <li className="nav__item"><Link to="/policy" className="nav__link">{t("header_police_link")}</Link></li>
                            </div>
                        ) : (
                            <div className="header__links">
                                <li className="nav__item"><Link to="/quizzes" className="nav__link">Тесты</Link></li>
                                <li className="nav__item"><Link to="/report" className="nav__link">Отчет</Link></li>
                            </div>
                        )}
                    </ul>
                </nav>

                <div className="nav__toggle" onClick={openNavList}>
                    <i className="uil uil-bars nav__toggle-icon"></i>
                </div>

                <div className="header__info">
                    <div className="header__lang">
                        <svg
                            width="23"
                            height="23"
                            viewBox="0 0 23 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.5 23C9.92833 23 8.44292 22.6979 7.04375 22.0938C5.64458 21.4897 4.42252 20.6655 3.37755 19.6213C2.33335 18.5771 1.50918 17.3554 0.905051 15.9562C0.300918 14.5571 -0.000765209 13.0717 1.45754e-06 11.5C1.45754e-06 9.90917 0.302068 8.41877 0.906201 7.0288C1.51033 5.63883 2.3345 4.42213 3.3787 3.3787C4.4229 2.33373 5.6442 1.50957 7.0426 0.9062C8.441 0.302833 9.9268 0.000766667 11.5 0C13.0908 0 14.5812 0.302067 15.9712 0.9062C17.3612 1.51033 18.5779 2.3345 19.6213 3.3787C20.6663 4.4229 21.4904 5.63998 22.0938 7.02995C22.6972 8.41992 22.9992 9.90993 23 11.5C23 13.0717 22.6979 14.5571 22.0938 15.9562C21.4897 17.3554 20.6655 18.5775 19.6213 19.6224C18.5771 20.6666 17.36 21.4908 15.97 22.0949C14.5801 22.6991 13.0901 23.0008 11.5 23ZM11.5 20.6425C11.9983 19.9525 12.4296 19.2337 12.7937 18.4862C13.1579 17.7387 13.455 16.9433 13.685 16.1H9.315C9.545 16.9433 9.84208 17.7387 10.2063 18.4862C10.5704 19.2337 11.0017 19.9525 11.5 20.6425ZM8.51 20.1825C8.165 19.55 7.86293 18.8933 7.6038 18.2125C7.34467 17.5317 7.12923 16.8276 6.9575 16.1H3.565C4.12083 17.0583 4.81582 17.8921 5.64995 18.6012C6.48408 19.3104 7.43743 19.8375 8.51 20.1825ZM14.49 20.1825C15.5633 19.8375 16.5171 19.3104 17.3512 18.6012C18.1853 17.8921 18.8799 17.0583 19.435 16.1H16.0425C15.87 16.8283 15.6546 17.5329 15.3962 18.2137C15.1378 18.8945 14.8358 19.5508 14.49 20.1825ZM2.5875 13.8H6.4975C6.44 13.4167 6.39668 13.0379 6.36755 12.6638C6.33842 12.2897 6.32423 11.9017 6.325 11.5C6.325 11.0975 6.33957 10.7096 6.3687 10.3362C6.39783 9.96283 6.44077 9.5841 6.4975 9.2H2.5875C2.49167 9.58333 2.4196 9.96207 2.3713 10.3362C2.323 10.7103 2.29923 11.0983 2.3 11.5C2.3 11.9025 2.32415 12.2904 2.37245 12.6638C2.42075 13.0372 2.49243 13.4159 2.5875 13.8ZM8.7975 13.8H14.2025C14.26 13.4167 14.3033 13.0379 14.3324 12.6638C14.3616 12.2897 14.3758 11.9017 14.375 11.5C14.375 11.0975 14.3604 10.7096 14.3313 10.3362C14.3022 9.96283 14.2592 9.5841 14.2025 9.2H8.7975C8.74 9.58333 8.69668 9.96207 8.66755 10.3362C8.63842 10.7103 8.62423 11.0983 8.625 11.5C8.625 11.9025 8.63957 12.2904 8.6687 12.6638C8.69783 13.0372 8.74077 13.4159 8.7975 13.8ZM16.5025 13.8H20.4125C20.5083 13.4167 20.5804 13.0379 20.6287 12.6638C20.677 12.2897 20.7008 11.9017 20.7 11.5C20.7 11.0975 20.6758 10.7096 20.6276 10.3362C20.5793 9.96283 20.5076 9.5841 20.4125 9.2H16.5025C16.56 9.58333 16.6033 9.96207 16.6324 10.3362C16.6616 10.7103 16.6758 11.0983 16.675 11.5C16.675 11.9025 16.6604 12.2904 16.6313 12.6638C16.6022 13.0372 16.5592 13.4159 16.5025 13.8ZM16.0425 6.9H19.435C18.8792 5.94167 18.1846 5.10792 17.3512 4.39875C16.5178 3.68958 15.5641 3.1625 14.49 2.8175C14.835 3.45 15.1371 4.10665 15.3962 4.78745C15.6553 5.46825 15.8708 6.17243 16.0425 6.9ZM9.315 6.9H13.685C13.455 6.05667 13.1579 5.26125 12.7937 4.51375C12.4296 3.76625 11.9983 3.0475 11.5 2.3575C11.0017 3.0475 10.5704 3.76625 10.2063 4.51375C9.84208 5.26125 9.545 6.05667 9.315 6.9ZM3.565 6.9H6.9575C7.13 6.17167 7.34582 5.4671 7.60495 4.7863C7.86408 4.1055 8.16577 3.44923 8.51 2.8175C7.43667 3.1625 6.48293 3.68958 5.6488 4.39875C4.81467 5.10792 4.12007 5.94167 3.565 6.9Z"
                                fill="#393939"
                            />
                        </svg>

                        <select
                            name="language"
                            id="language"
                            className="header__lang-options"
                            onChange={(e) => handleLanguageChange(e)}
                        >
                            <option value="ru" className="header__lang-option">
                                RU
                            </option>
                            <option value="kz" className="header__lang-option">
                                KZ
                            </option>
                        </select>
                    </div>
                    <PhoneNumberFormatter numberPhone={numberPhone} />

                    <div className="header__profile">
                        <div className="header__profile-content">
                            {data.isAuthenticated ? (
                                <div className="header__profile-info">
                                    <div>{data.itin}</div>
                                    <div>{data.email}</div>
                                </div>
                            ) : (
                                <div className="header__profile-links">
                                    <button
                                        className="header__profile-link"
                                        onClick={handleLoginModal}
                                    >
                                        Вход
                                    </button>
                                    <button
                                        className="header__profile-link"
                                        onClick={handleRegisterModal}
                                    >
                                        Регистрация
                                    </button>
                                </div>
                            )}
                        </div>
                        <button onClick={openHeaderList}>
                            <img
                                src="https://i.imgur.com/1pS9Squ.png"
                                alt="Profile Icon"
                                className="header__profile-icon"
                            />
                        </button>
                        {/* Pass isOpen and closeList to HeaderList */}
                        {isHeaderListOpen && data.isAuthenticated && (
                            <HeaderList
                                data={{
                                    ...data,
                                    isListOpened: isHeaderListOpen,
                                    closeList: closeHeaderList,
                                    roles: data.roles,
                                }}
                            />
                        )}
                    </div>
                </div>
                {isNavListOpen && (
                    <NavList
                        data={{
                            ...data,
                            isNavListOpened: isNavListOpen,
                            closeNavList: closeNavList,
                            roles: data.roles,
                        }}
                    />
                )}
            </div>
        </header >
    );
};

export default Header;
