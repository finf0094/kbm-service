import {ApplicationStatus} from './ApplicationStatus.ts';
import {IUserDetail} from '../user/IUserDetail.ts';
import { IScheduleInterviewDetails } from '../IScheduleInterviewDetails.ts';


export interface IApplicationSummary {
    id: number,
    user: IUserDetail,
    status: ApplicationStatus,
    interviewDetails?: IScheduleInterviewDetails
}
