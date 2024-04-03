import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import './HeaderList.css'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/by-itin'
import useAuth from '@/shared/lib/useAuth'
import useCurrentUser from '@/shared/lib/useCurrentUser'
import { useAppSelector } from '@/app/store/hooks'
import { ApplicationStatus } from '@/entities/application'

interface HeaderListProps {
	isListOpened: boolean
	closeList: () => void // Function to toggle the list
}

const HeaderList: FC<HeaderListProps> = ({ isListOpened, closeList }) => {
	const { status } = useAppSelector(state => state.application);
	const [animationClass, setAnimationClass] = useState<string>('')

	console.log(status);
	
	
	const dispatch = useDispatch()
	const { isAuthenticated } = useAuth();
	const user = useCurrentUser();

	const handleToggleList = () => {
		if (isListOpened) {
			// Closing animation
			setAnimationClass('closing-animation')
			setTimeout(() => {
				// After the animation is complete, reset animation class and close the list
				setAnimationClass('')
				closeList()
			}, 300) // Adjust the timeout duration to match your animation duration
		} else {
			// Opening animation
			setAnimationClass('opening-animation')
			closeList()
		}
	}

	const handleLogout = () => {
		dispatch(logout())
		handleToggleList()
	}

	const modalClass = isListOpened ? 'list-open' : 'list-closed'

	return (
		<div className={`header__list ${modalClass} ${animationClass}`}>
			{isAuthenticated ? (
				<div className='list__wrapper'>
					<button className='list__close' onClick={handleToggleList}>
						<i className='uil uil-times'></i>
					</button>
					<div className='list__profile'>
						<img
							src='https://i.imgur.com/1pS9Squ.png'
							alt='Profile Icon'
							className='list__profile-icon'
						/>
						<div className='list__profile-info'>
							<div>{user.itin}</div>
							<div>{(user.firstname && user.lastname) && `${user.firstname} ${user.lastname}`}</div>
						</div>
					</div>
					<ul className='list__items'>
						<li className='list__items-content'>
							<Link to='/profile' className='list__item' onClick={handleToggleList}>
								<i className='uil uil-user-circle list__icon'></i>
								<div className='list__item-link'>Профиль</div>
							</Link>
							{user.roles && Array.isArray(user.roles) && user.roles.includes('ROLE_USER') && (
								<>
									{(status === ApplicationStatus.IN_PROCESS || status === ApplicationStatus.PENDING || status === ApplicationStatus.TESTINS) && (
										<Link to='/application' className='list__item' onClick={handleToggleList}>
											<i className='uil uil-comment-alt-notes list__icon'></i>
											<div className='list__item-link'>Моя заявка</div>
										</Link>
									)}
									<Link to='/quiz-sessions' className='list__item' onClick={handleToggleList}>
										<i className='uil uil-clipboard-notes list__icon'></i>
										<div className='list__item-link'>Тестирование</div>
									</Link>
								</>
							)}
						</li>
						{user.roles && user.roles.includes('ROLE_ADMIN') &&
							(<li className='list__items-content'>
								<Link to='/' className='list__item' onClick={handleToggleList}>
									<i className='uil uil-user-md list__icon'></i>
									<div className='list__item-link'>Модерация</div>
								</Link>
							</li>)}
						<li className='list__items-content'>
							<button className='list__item' onClick={handleLogout}>
								<i className='uil uil-signout list__icon list__icon-logout'></i>
								<div className='list__items-link'>Выйти</div>
							</button>
						</li>
					</ul>
				</div>
			) : null}
		</div>
	)
}

export default HeaderList
