import { HomePage } from '@/pages'
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/shared/ui'
import { ProfilePage } from '@/pages'

export const AppRouter: FC = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/*" element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	);
};