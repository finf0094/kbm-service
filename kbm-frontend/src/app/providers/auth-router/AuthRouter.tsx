import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/pages'
import { RegisterPage } from '@/pages'

export const AuthRouter: FC = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/*'	element={<Navigate to='/login' replace />}
			/>
		</Routes>
	)
}