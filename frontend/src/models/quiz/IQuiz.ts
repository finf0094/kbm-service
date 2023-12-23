import {IPosition} from "../position/IPosition.ts";
import {IQuestion} from "./IQuestion.ts";
import {IOpenQuestion} from "./IOpenQuestion.ts";

export interface IQuiz {
    quizId?: string,
    title: string,
    description: string,
    duration: number,
    position: IPosition,
    questions: IQuestion[],
    openQuestions: IOpenQuestion[],
    createdAt?: Date,
    updatedAt?: Date,
}