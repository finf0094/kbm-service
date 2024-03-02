import { FC, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import "./NavList.css"
import { logout } from '@/features/auth/by-itin/model/slice/authSlice'
import useAuth from '@/shared/lib/useAuth'

interface NavListProps {
	isListOpened: boolean
	closeList: () => void
}

const NavList: FC<NavListProps> = ({ isListOpened, closeList }) => {
	const [animationClass, setAnimationClass] = useState("")
	const dispatch = useDispatch()
	const auth = useAuth();

	const handleToggleList = () => {
		if (isListOpened) {
			// Closing animation
			setAnimationClass("navList-closing-animation")
			setTimeout(() => {
				// After the animation is complete, reset animation class and close the list
				setAnimationClass("")
				closeList()
			}, 300) // Adjust the timeout duration to match your animation duration
		} else {
			// Opening animation
			setAnimationClass("navList-opening-animation")
			closeList()
		}
	}

	// const handleRegisterModal = () => {
	//     dispatch(openModal({ id: "registerModal" }));
	//     handleToggleList();
	// };

	// const handleLoginModal = () => {
	//     dispatch(openModal({ id: "loginModal" }));
	//     handleToggleList();
	// };

	const handleLogout = () => {
		dispatch(logout())
		handleToggleList()
	}

	const modalClass = isListOpened ? "navList-open" : "navList-closed"

	return (
		<div>
			<div className={`navList ${modalClass} ${animationClass}`}>
				<div className={`navList__wrapper ${modalClass} ${animationClass}`}>
					<i
						className="uil uil-times navList__close"
						onClick={handleToggleList}
					></i>
					<div className="navList__profile">
						<img
							src="https://i.imgur.com/1pS9Squ.png"
							alt="Profile Icon"
							className="navList__profile-icon"
						/>
						{auth.isAuthenticated ? (
							<div className="navList__profile-info">
								<div>{auth.user.itin}</div>
								<div>{auth.user.email}</div>
							</div>
						) : (
							<div className="navList__profile-links">
								<button
									className="navList__profile-link"
								// onClick={handleLoginModal}
								>
									Вход
								</button>
								<button
									className="navList__profile-link"
								// onClick={handleRegisterModal}
								>
									Регистрация
								</button>
							</div>
						)}
					</div>
					<ul className="navList__items">
						<li className="navList__items-content">
							<Link to="/" className="navList__item" onClick={handleToggleList}>
								<i className="uil uil-estate navList__icon"></i>
								<div className="navList__item-link">Главная</div>
							</Link>

							<Link
								to="/policy"
								className="navList__item"
								onClick={handleToggleList}
							>
								<i className="uil uil-file-alt navList__icon"></i>
								<div className="navList__item-link">Политика</div>
							</Link>
						</li>
						{auth.user.roles && (auth.user.roles.includes("ROLE_USER") || auth.user.roles.includes("ROLE_MODERATOR")) && (
							<div className="userLinks">
								<li className="navList__items-content">
									<Link
										to="/profile"
										className="navList__item"
										onClick={handleToggleList}
									>
										<i className="uil uil-user-circle navList__icon"></i>
										<div className="navList__item-link">Профиль</div>
									</Link>
								</li>
							</div>
						)}
						{auth.user.roles && auth.user.roles.includes("ROLE_USER") && (
							<li className="navList__items-content">
								<Link
									to="/quiz-sessions"
									className="navList__item"
									onClick={handleToggleList}
								>
									<i className="uil uil-clipboard-notes navList__icon"></i>
									<div className="navList__item-link">Тест</div>
								</Link>
							</li>
						)}
						{auth.user.roles && auth.user.roles.includes("ROLE_MODERATOR") && (
							<li className="navList__items-content">
								<Link
									to="/moderation"
									className="navList__item"
									onClick={handleToggleList}
								>
									<i className="uil uil-user-md navList__icon"></i>
									<div className="navList__item-link">Модерация</div>
								</Link>
							</li>
						)}
					</ul>
					{auth.user.roles && (auth.user.roles.includes("ROLE_USER") || auth.user.roles.includes("ROLE_MODERATOR")) && (
						<li className="navList__items-content">
							<div className="navList__item navList__leave">
								<i className="uil uil-signout navList__icon"></i>
								<button onClick={handleLogout}>Выйти</button>
							</div>
						</li>
					)}
				</div>
			</div>
		</div>
	)
}

export default NavList
