export interface IUserDetail {
    id: number,
    itin: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    position: string,
    phoneNumber: string,
    aboutMe: string,
}

export type IUserSummary = Omit<IUserDetail, 'password'>;