import {ApplicationStatus} from "./ApplicationStatus.ts";
import {IUserDetail} from "../user/IUserDetail.ts";


export interface IApplicationSummary {
    id: number,
    user: IUserDetail,
    status: ApplicationStatus
}
