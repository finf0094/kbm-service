import { Link } from "react-router-dom";
import "./UI/Sidebar.css";

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="sidebar__inner">
                    <ul className="sidebar__items">
                        {mockData.map((item) => (
                            <li className="sidebar__item" key={item.title}>
                                <h3 className="sidebar__item-title">{item.title}</h3>
                                {item.links.map((link) => (
                                    <div className="sidebar__item-link" key={link.name}>
                                        <Link to={link.redirect}>{link.name}</Link>
                                        <Link to={`${link.redirect}add`} className="sidebar__item-add">
                                            <span>+</span> Add
                                        </Link>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

// TODO: realize this data in server
const mockData = [
    {
        title: "АВТОРИЗАЦИЯ",
        links: [
            {
                name: "Пользователи",
                redirect: "/auth/users/"
            },
            {
                name: "Разрешение",
                redirect: "/auth/permissions",
            }
        ]
    },
    {
        title: "ИНТЕГРАЦИЯ",
        links: [
            {
                name: "Локации",
                redirect: "/integration/locations/"
            },
            {
                name: "Департаменты",
                redirect: "/integration/departments/"
            },
            {
                name: "Позиции",
                redirect: "/integration/positions/"
            },
            {
                name: "Политика",
                redirect: "/integration/policy"
            },
            {
                name: "Куратора",
                redirect: "/integration/curators"
            },
        ]
    }
]

export default Sidebar;