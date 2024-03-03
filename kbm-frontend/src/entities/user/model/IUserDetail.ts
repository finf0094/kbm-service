import { IPosition } from '@/entities/position/model/IPosition'

export interface IUserDetail {
	id: number;
	itin: string;
	firstname: string;
	lastname: string;
	phoneNumber: string;
	position: IPosition;
	aboutMe: string;
	roles: [
		{
			id: number;
			name: string;
		}
	]
	email: string;
	password?: string;
	createdAt: string;
	updatedAt: string;
	resumeUrl: string;
}