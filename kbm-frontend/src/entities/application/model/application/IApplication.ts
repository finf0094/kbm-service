import {ApplicationStatus} from './ApplicationStatus.ts';
import {IUserDetail} from '../user/IUserDetail.ts';
import {IPosition} from '../position/IPosition.ts';
import {IEmployee} from '../employee/IEmployee.ts';
import {IExperience} from '../IExperience.ts';
import {IEducation} from '../IEducation.ts';
import { IScheduleInterviewDetails } from '../IScheduleInterviewDetails.ts';

export interface IApplication{
    id: string,
    status: ApplicationStatus,
    user: IUserDetail,
    desiredPositions: IPosition[],
    employee: IEmployee,
    experiences: IExperience[]
    educations: IEducation[],
    interviewDetails: IScheduleInterviewDetails,
    videoUrl: string
}