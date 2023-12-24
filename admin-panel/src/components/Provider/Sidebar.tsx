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
                                        <button className="sidebar__item-add">
                                            <span>+</span> Add
                                        </button>
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

// TODO: realize this data with server 
const mockData = [
    {
        title: "AUTHENTICATION AND AUTHORIZATION",
        links: [
            {
                name: "Groups",
                redirect: "/auth/group/"
            },
            {
                name: "Users",
                redirect: "/auth/user/"
            }
        ]
    },
    {
        title: "INTEGRATION",
        links: [
            {
                name: "Локации",
                redirect: "/integration/locations/"
            },
            {
                name: "Департаменты",
                redirect: "/integration/departments/"
            }
        ]
    }
]

export default Sidebar;