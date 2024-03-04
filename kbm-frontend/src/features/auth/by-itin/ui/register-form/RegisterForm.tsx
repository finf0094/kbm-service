import React, { FC, useState } from 'react'
import './RegisterForm.css'
import { login, register } from '../../model/services/authService'
import { useAppDispatch } from '@/app/store/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const RegisterForm: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const [itin, setItin] = useState<string>('')
	const [firstname, setFirstname] = useState<string>('')
	const [lastname, setLastname] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [email, setEmail] = useState<string>('')

	const [error, setError] = useState<string>('')

	const handleItinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, '') // Keep only digits
		setItin(value)
	}

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!itin || !password || !email) {
			setError('Заполните все поля!')
			return
		} else {
			try {
				await dispatch(register({ itin, firstname, lastname, password, email }))
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					.then(async (response: any) => {
						if (response.payload.status === 201) {
							// Login to registered account
							await dispatch(login({ itin, password }));
							navigate('/profile');
							toast.success('Регистрация успешно пройдена!');
							toast.success('Пожалуйста, заполните информацию о себе нажав кнопку "Редактировать"');
						} else {
							setError(response.payload?.message)
						}
					})
			} catch (error) {
				console.error(error)
				setError(`Ошибка при авторизации: ${error}`)
			}
		}
	}

	return (
		<div className='register-form'>
			<div className='register-form__head'>
				<h3 className='register-form__title'>Регистрация</h3>
				<p className='register-form__subtitle'>Введите нужные данные для регистрации</p>
			</div>

			<form className='register-form__form' onSubmit={handleRegister}>
				<div className='register-form__fields'>
					<div className='register-form__group'>
						<input
							type='text'
							className='register-form__input'
							placeholder='ИИН'
							maxLength={12}
							minLength={12}
							required
							value={itin}
							onChange={handleItinChange}
						/>
					</div>
					<div className='register-form__group'>
						<input
							type='text'
							className='register-form__input'
							placeholder='Имя'
							required
							value={firstname}
							onChange={(e) => { 
								if (!/^[a-zA-Zа-яА-Я,.!\s]*$/.test(e.target.value)) return; 
								setFirstname(e.target.value) 
							}}
						/>
					</div>
					<div className='register-form__group'>
						<input
							type='text'
							className='register-form__input'
							placeholder='Фамилия'
							required
							value={lastname}
							onChange={(e) => {
								if (!/^[a-zA-Zа-яА-Я,.!\s]*$/.test(e.target.value)) return;
								setLastname(e.target.value)
							}}
						/>
					</div>
					<div className='register-form__group'>
						<input
							type='password'
							className='register-form__input'
							placeholder='Пароль'
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div className='register-form__group'>
						<input
							type='email'
							className='register-form__input'
							placeholder='Email'
							value={email}
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						{error && <span className='error'>{error}</span>}
					</div>
				</div>

				<div className='register-form__link'>Уже авторизованы? <Link to='/login'>Войти</Link></div>
				<button className='register-form__button ui-button'>Регистрация</button>
			</form>
		</div>
	)
}
