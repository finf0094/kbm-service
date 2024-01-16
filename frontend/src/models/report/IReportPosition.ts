import { IApplicationSummary } from "../application/IApplicationSummary"

export interface IReportPosition {
    positionName: string,
    totalApplications: number,
    passedApplications: number,
    failedApplications: number,
    inPending: number,
    inInterview: number,
    inTesting: number,
    inProcess: number
    candidates: IApplicationSummary[]
}