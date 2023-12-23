import {IUser} from "../user/IUser.ts";


export interface IAuthResponse {
    isAuthenticated: boolean;
    access_token: string;
    refresh_token: string;
    user: IUser;
}