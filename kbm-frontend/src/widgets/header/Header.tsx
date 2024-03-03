import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import headerLogo from '@/shared/assets/header-logo.png'
import profileIcon from '@/shared/assets/icons/profile-icon.svg'
import langIcon from '@/shared/assets/icons/lang-icon.svg'
import useAuth from '@/shared/lib/useAuth'
import HeaderList from '@/widgets/header-list/HeaderList'
import HeaderSidebar from '../sidebar/Sidebar'

export const Header: FC = () => {
	const [isHeaderListOpen, setIsHeaderListOpen] = useState<boolean>(false)
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const auth = useAuth()

	const openHeaderList = () => setIsHeaderListOpen(true)
	const closeHeaderList = () => setIsHeaderListOpen(false)

	const openSidebar = () => setIsSidebarOpen(true)
	const closeSidebar = () => setIsSidebarOpen(false)

	return (
		<header className="header">
			<div className="header__wrapper">
				<div className="header__main">
					<img src={headerLogo} alt="" className="header__logo" />

					<nav className="header__nav">
						<ul className="nav__list">
							<li className="nav__item"><Link to="/" className='nav__link'>Главная</Link></li>
							<li className="nav__item"><Link to="/policy" className='nav__link'>Политика</Link></li>
						</ul>
					</nav>
				</div>

				<div className="header__controls">
					<div className="header__lang">
						<img src={langIcon} alt="" />

						<select id="language" className="header__lang-options">
							<option value="ru" className="header__lang-option">RU</option>
							<option value="kz" className="header__lang-option">KZ</option>
						</select>
					</div>

					<div className="header__number">+7 (777) 777 77 77</div>

					<div className="header__profile">
						<div className="header__profile-items">
							<div className="header__profile-item">{auth.isAuthenticated ? auth.user.itin : 'Вход'}</div>
							<div className="header__profile-item">{auth.isAuthenticated ? auth.user.email : 'Регистрация'}</div>
						</div>
						<img src={profileIcon} alt="" className="header__profile-icon" onClick={openHeaderList} />
					</div>
				</div>

				<div className="nav__toggle" onClick={openSidebar}>
					<i className="uil uil-bars nav__toggle-icon"></i>
				</div>

				

				{/* Header List */}
				{isHeaderListOpen && auth.isAuthenticated && <HeaderList isListOpened={isHeaderListOpen} closeList={closeHeaderList} />}
			</div>
			
			{/* Nav List */}
			{isSidebarOpen && auth.isAuthenticated && <HeaderSidebar isListOpened={isSidebarOpen} closeList={closeSidebar} />}
		</header>
	)
}