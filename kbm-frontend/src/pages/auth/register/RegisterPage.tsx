import { FC } from 'react';
import './RegisterPage.css';
import { RegisterForm } from '@/features/auth/by-itin/ui/register-form/RegisterForm'

export const RegisterPage: FC = () => {
	return (
		<div className='register'>
			<RegisterForm />
		</div>
	);
};