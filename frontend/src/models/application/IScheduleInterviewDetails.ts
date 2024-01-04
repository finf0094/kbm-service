import {ICuratorDetail} from "../curator/ICuratorDetail.ts";


export interface IScheduleInterviewDetails {
    time: Date;
    format: string;
    venue: string;
    position: string;
    curator: ICuratorDetail
}


export interface IScheduleInterviewDetailsDTO {
    time: Date;
    format: string;
    venue: string;
    position: string;
    curatorId: number
}