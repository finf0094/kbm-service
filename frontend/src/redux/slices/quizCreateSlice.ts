import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IQuiz} from "../../models/quiz/IQuiz.ts";
import {IPosition} from "../../models/position/IPosition.ts";
import {IQuestion} from "../../models/quiz/IQuestion.ts";
import {IOpenQuestion} from "../../models/quiz/IOpenQuestion.ts";


export const initialState: IQuiz = {
    title: "",
    description: "",
    duration: 0,
    position: {
        id: 1,
        name: 'IT'
    },
    openQuestions: [],
    questions: [
        {
            text: "",
            answers: [
                {
                    text: "",
                    answerWeight: 0,
                },
            ],
        },
    ],
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setQuizData: (_, action: PayloadAction<IQuiz>) => {
            return action.payload;
        },
        handleQuizDataChange: (state, action: PayloadAction<{ name: string; value: any }>) => {
            const {name, value} = action.payload;
            (state as any)[name] = value;
        },
        setPosition: (state, action: PayloadAction<IPosition>) => {
            state.position.id = action.payload.id;
            state.position.name = action.payload.name
        },
        addQuestion: (state) => {
            const newQuestion: IQuestion = {
                text: "",
                answers: [
                    {
                        text: "",
                        answerWeight: 0,
                    },
                ],
            };
            state.questions.push(newQuestion);
        },
        updateQuestion: (state, action: PayloadAction<{ index: number, text: string }>) => {
            const { index, text } = action.payload;
            state.questions[index].text = text;
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            state.questions.splice(action.payload, 1);
        },
        addOpenQuestion: (state) => {
            const newOpenQuestion: IOpenQuestion = {
                name: "",
            };
            state.openQuestions.push(newOpenQuestion);
        },
        updateOpenQuestion: (state, action: PayloadAction<{ index: number, name: string }>) => {
            const {index, name} = action.payload;
            state.openQuestions[index].name = name;
        },
        removeOpenQuestion: (state, action: PayloadAction<number>) => {
            state.openQuestions.splice(action.payload, 1);
        },
        addAnswer: (state, action: PayloadAction<number>) => {
            const updatedQuestion = state.questions[action.payload];
            const newAnswer = {
                text: "",
                answerWeight: 0, // initialize answerWeight to 0
            };
            updatedQuestion.answers.push(newAnswer);
        },
        updateAnswer: (state, action: PayloadAction<{ questionIndex: number, answerIndex: number, text: string }>) => {
            const { questionIndex, answerIndex, text } = action.payload;
            state.questions[questionIndex].answers[answerIndex].text = text;
        },
        updateAnswerWeight: (state, action: PayloadAction<{ questionIndex: number, answerIndex: number, weight: number }>) => {
            const { questionIndex, answerIndex, weight } = action.payload;
            state.questions[questionIndex].answers[answerIndex].answerWeight = weight;
        },
        removeAnswer: (state, action: PayloadAction<{ questionIndex: number, answerIndex: number }>) => {
            const {questionIndex, answerIndex} = action.payload;
            const updatedQuestion = state.questions[questionIndex];
            if (updatedQuestion.answers && updatedQuestion.answers.length > 1) {
                updatedQuestion.answers.splice(answerIndex, 1);
            }
        },

    },
});

export const {
    setQuizData,
    handleQuizDataChange,
    setPosition,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOpenQuestion,
    updateOpenQuestion,
    removeOpenQuestion,
    addAnswer,
    updateAnswer,
    removeAnswer,
    updateAnswerWeight,
} = quizSlice.actions;

export default quizSlice.reducer;