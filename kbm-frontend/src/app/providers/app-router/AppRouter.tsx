import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/shared/ui'

// PAGES
import { ProfilePage } from '@/pages'
import { PolicyPage } from '@/pages/policy/PolicyPage'
import { HomePage } from '@/pages'
import { ApplicationPage } from '@/pages/application/ApplicationPage'

export const AppRouter: FC = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<HomePage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/policy' element={<PolicyPage />} />
				<Route path='/application' element={<ApplicationPage />} />
				<Route path='/*' element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	);
};