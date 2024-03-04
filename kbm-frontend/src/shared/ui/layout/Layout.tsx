import { FC } from 'react';
import './Layout.css';
import { Header } from '@/widgets/header/Header'
import { Outlet } from 'react-router-dom'
import { Footer } from '@/widgets/footer/Footer'

export const Layout: FC = () => {
	return (
		<div className='layout'>
			<Header />

			<main className='main'>
				<Outlet />
			</main>
			
			<Footer />
		</div>
	);
};