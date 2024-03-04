import { FC } from 'react';
import './LoginPage.css';
import { LoginForm } from '@/features/auth/by-itin'

export const LoginPage: FC = () => {
	return (
		<div className='login'>
			<LoginForm />
		</div>
	);
};