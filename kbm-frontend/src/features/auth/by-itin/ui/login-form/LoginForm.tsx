import React, { FC, useState } from 'react'
import './LoginForm.css'
import { useAppDispatch } from '@/app/store/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../model/services/authService'
import { toast } from 'react-toastify'

export const LoginForm: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [itin, setItin] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const handleItinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '') // Keep only digits
		setItin(value)
	}

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!itin || !password) {
			setError('Заполните все поля!')
			return
		} else {
			try {
				await dispatch(login({ itin, password }))
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.then((response: any) => {
						console.log('response',response)
						if (response.type === 'auth/login/fulfilled') {
							navigate('/')
							toast.success('Авторизация успешно пройдена!')
						} else {
							if (response.payload.status === 404) setError(`Пользователь не найден`)
							setError(response.payload.message)
						}
					})
			} catch (error) {
				console.error(error)
				setError(`Ошибка при авторизации: ${error}`)
			}
		}
	}

	return (
		<div className='login-form'>
			<h3 className='login-form__title'>Вход</h3>

			<form className='login-form__form' onSubmit={handleLogin}>
				<div className='login-form__fields'>
					<div className='login-form__group'>
						<input
							type='text'
							className='login-form__input'
							placeholder='ИИН'
							maxLength={12}
							minLength={12}
							required
							value={itin}
							onChange={handleItinChange}
						/>
					</div>
					<div className='login-form__group'>
						<input
							type='password'
							className='login-form__input'
							placeholder='Пароль'
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <span className='error'>{error}</span>}
					</div>
				</div>

				<div className='login-form__link'>Не авторизованы? <Link to='/register'>Зарегистрироваться</Link></div>
				<button className='login-form__button ui-button'>Войти</button>
			</form>
		</div>
	)
}
