import {IPosition} from "../position/IPosition.ts";

export interface IQuizSummary{
    quizId: string,
    title: string,
    description: string,
    duration: number,
    position: IPosition
}