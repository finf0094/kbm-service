import {IPosition} from "../position/IPosition.ts";

export interface IUserDetail {
    id: number,
    itin: string,
    firstname: string,
    lastname: string,
    email: string,
    position: IPosition,
    phoneNumber: string,
    aboutMe: string,
    createdAt: string,
    updatedAt: string,
    resumeUrl: string
}