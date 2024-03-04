import { FC } from 'react';
import { ProgressSpinner } from 'primereact/progressspinner'

export const Loader: FC = () => {
	return (
		<div className='loader' style={{ 
			width: '100%', 
			height: '100%', 
			display: 'flex', 
			alignItems: 'center', 
			justifyContent: 'center', 
			background: '#fff', 
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 1000
		}}>
			<ProgressSpinner strokeWidth='5' />
		</div>
	);
};