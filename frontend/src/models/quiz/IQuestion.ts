export interface IQuestion {
    questionId?: string,
    text: string,
    answers:IAnswer[]
}


export interface IAnswer {
    answerId?: string,
    text: string,
    answerWeight: number
}