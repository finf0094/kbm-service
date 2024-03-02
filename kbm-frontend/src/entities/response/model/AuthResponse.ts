import { IUser } from '@/entities/user/model/IUser'

export interface IAuthResponse {
	isAuthenticated: boolean;
	access_token: string;
	refresh_token: string;
	user: IUser;
}