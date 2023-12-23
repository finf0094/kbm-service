import './UI/SideBar.css'

const Sidebar = () => {


    return (
        <div className="sidebar">
            <div className="sidebar-section">
                <h3>AUTHENTICATION AND AUTHORIZATION</h3>
                <a href="#">Groups</a>
                <a href="#">Users</a>
            </div>
            <div className="sidebar-section">
                <h3>INTEGRATION</h3>
                <a href="#">Вопросы</a>
                <a href="#">Департаменты</a>
            </div>
        </div>
    )
}

export default Sidebar;