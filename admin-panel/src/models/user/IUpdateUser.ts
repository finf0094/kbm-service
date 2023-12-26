import {IRole} from "./IRole.ts";
import {IPosition} from "../position/IPosition.ts";

export interface IUpdateUser {
    id: number,
    itin: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    position: IPosition,
    phoneNumber: string,
    roles: IRole[]
    aboutMe: string,
}