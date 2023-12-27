import {IRole} from "./IRole.ts";
import {IPosition} from "../position/IPosition.ts";

export interface IUserDetail {
    id: number,
    itin: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    position: IPosition,
    phoneNumber: string,
    roles: IRole[],
    aboutMe: string,
}

export type IUserSummary = Omit<IUserDetail, 'password'>;