import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import headerLogo from '@/shared/assets/header-logo.png'
import profileIcon from '@/shared/assets/icons/profile-icon.svg'
import langIcon from '@/shared/assets/icons/lang-icon.svg'
import useAuth from '@/shared/lib/useAuth'
import HeaderList from '@/widgets/header-list/HeaderList'
import NavList from '../nav-list/NavList'

export const Header: FC = () => {
	const [fixed, setFixed] = useState<boolean>(false)

	const [isHeaderListOpen, setIsHeaderListOpen] = useState<boolean>(false)
	const [isNavListOpen, setIsNavListOpen] = useState<boolean>(false)

	const auth = useAuth()

	useEffect(() => {
		const fixedHeader = () => {
			if (window.scrollY >= 50) setFixed(true)
			else setFixed(false)
		}

		window.addEventListener("scroll", fixedHeader)
		window.removeEventListener("load", fixedHeader)

		return () => {
			window.removeEventListener("scroll", fixedHeader)
		}
	}, [])

	const openHeaderList = () => setIsHeaderListOpen(true)
	const closeHeaderList = () => setIsHeaderListOpen(false)

	const openNavList = () => setIsNavListOpen(true)
	const closeNavList = () => setIsNavListOpen(false)

	return (
		<header className={fixed ? "header fixed" : "header"}>
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

				<div className="nav__toggle" onClick={openNavList}>
					<i className="uil uil-bars nav__toggle-icon"></i>
				</div>

				

				{/* Header List */}
				{isHeaderListOpen && auth.isAuthenticated && <HeaderList isListOpened={isHeaderListOpen} closeList={closeHeaderList} />}
			</div>
			
			{/* Nav List */}
			{isNavListOpen && auth.isAuthenticated && <NavList isListOpened={isNavListOpen} closeList={closeNavList} />}
		</header>
	)
}