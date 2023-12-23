import {IUser} from "../user/IUser.ts";
import {IQuiz} from "../quiz/IQuiz.ts";

export interface IQuizSession {
    sessionId: string,
    user: IUser,
    quiz: IQuiz,
    selectedAnswers: any,
    startTime: string,
    endTime: string,
    status: QuizSessionStatus,
    score: number,
    scorePercentage: number
}

export enum QuizSessionStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    TIME_EXPIRED = "TIME_EXPIRED"
}