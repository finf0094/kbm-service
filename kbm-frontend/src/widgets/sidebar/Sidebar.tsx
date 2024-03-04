import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './Sidebar.css'
import { logout } from '@/features/auth/by-itin'
import useCurrentUser from '@/shared/lib/useCurrentUser'

interface SidebarProps {
	isListOpened: boolean
	closeList: () => void
}

const Sidebar: FC<SidebarProps> = ({ isListOpened, closeList }) => {
	const [animationClass, setAnimationClass] = useState<string>('')

	const dispatch = useDispatch()
	const user = useCurrentUser()

	const handleToggleList = () => {
		if (isListOpened) {
			// Closing animation
			setAnimationClass('sidebar-closing-animation')
			setTimeout(() => {
				// After the animation is complete, reset animation class and close the list
				setAnimationClass('')
				closeList()
			}, 300) // Adjust the timeout duration to match your animation duration
		} else {
			// Opening animation
			setAnimationClass('sidebar-opening-animation')
			closeList()
		}
	}

	const handleLogout = () => {
		dispatch(logout())
		handleToggleList()
	}

	const modalClass = isListOpened ? 'sidebar-open' : 'sidebar-closed'

	return (
		<div>
			<div className={`sidebar ${modalClass} ${animationClass}`}>
				<div className={`sidebar__wrapper ${modalClass} ${animationClass}`}>
					<i
						className='uil uil-times sidebar__close'
						onClick={handleToggleList}
					></i>
					<div className='sidebar__profile'>
						<img
							src='https://i.imgur.com/1pS9Squ.png'
							alt='Profile Icon'
							className='sidebar__profile-icon'
						/>
						<div className='sidebar__profile-info'>
							<div>{user.itin}</div>
							<div>{(user.firstname && user.lastname) && `${user.firstname} ${user.lastname}`}</div>
						</div>
					</div>
					<ul className='sidebar__items'>
						<li className='sidebar__items-content'>
							<Link to='/' className='sidebar__item' onClick={handleToggleList}>
								<i className='uil uil-estate sidebar__icon'></i>
								<div className='sidebar__item-link'>Главная</div>
							</Link>

							<Link
								to='/policy'
								className='sidebar__item'
								onClick={handleToggleList}
							>
								<i className='uil uil-file-alt sidebar__icon'></i>
								<div className='sidebar__item-link'>Политика</div>
							</Link>
						</li>
						{user.roles && (user.roles.includes('ROLE_USER') || user.roles.includes('ROLE_ADMIN')) && (
							<div className='userLinks'>
								<li className='sidebar__items-content'>
									<Link
										to='/profile'
										className='sidebar__item'
										onClick={handleToggleList}
									>
										<i className='uil uil-user-circle sidebar__icon'></i>
										<div className='sidebar__item-link'>Профиль</div>
									</Link>
								</li>
							</div>
						)}
						{user.roles && user.roles.includes('ROLE_USER') && (
							<li className='sidebar__items-content'>
								<Link
									to='/quiz-sessions'
									className='sidebar__item'
									onClick={handleToggleList}
								>
									<i className='uil uil-clipboard-notes sidebar__icon'></i>
									<div className='sidebar__item-link'>Тест</div>
								</Link>
							</li>
						)}
						{user.roles && user.roles.includes('ROLE_ADMIN') && (
							<li className='sidebar__items-content'>
								<Link
									to='/moderation'
									className='sidebar__item'
									onClick={handleToggleList}
								>
									<i className='uil uil-user-md sidebar__icon'></i>
									<div className='sidebar__item-link'>Модерация</div>
								</Link>
							</li>
						)}
					</ul>
					{user.roles && (user.roles.includes('ROLE_USER') || user.roles.includes('ROLE_ADMIN')) && (
						<li className='sidebar__items-content'>
							<div className='sidebar__item sidebar__leave'>
								<i className='uil uil-signout sidebar__icon'></i>
								<button onClick={handleLogout}>Выйти</button>
							</div>
						</li>
					)}
				</div>
			</div>
		</div>
	)
}

export default Sidebar
