import { HomePage } from '@/pages/home/HomePage'
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '@/shared/ui/layout/Layout'

export const AppRouter: FC = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/*" element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	);
};