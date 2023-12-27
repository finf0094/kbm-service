import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { quizSessionApi } from '../api/quizSessionApi';
import {IQuizSession} from "../../models/quizSession/IQuizSession.ts";
import {ISubmitAnswerRequest} from "../../models/quizSession/request/ISubmitAnswerRequest.ts";
import {IEndQuizSessionRequest} from "../../models/quizSession/request/IEndQuizSessionRequest.ts";
import {ISubmitOpenAnswerRequest} from "../../models/quizSession/request/ISubmitOpenAnswerRequest.ts";

interface QuizSessionState {
    session: IQuizSession | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: QuizSessionState = {
    session: null,
    status: 'idle',
    error: null
};

export const fetchQuizSessionById = createAsyncThunk<IQuizSession, string>(
    'quizSession/fetchByIdStatus',
    async (sessionId, { dispatch }) => {
        const response = await dispatch(quizSessionApi.endpoints.getQuizSessionById.initiate(sessionId));
        if ('data' in response) {
            return response.data as IQuizSession;
        } else {
            throw new Error('Failed to fetch quiz session');
        }
    }
);

export const startQuizSession = createAsyncThunk<IQuizSession, string>(
    'quizSession/startStatus',
    async (sessionId, { dispatch }) => {
        const response = await dispatch(quizSessionApi.endpoints.startQuiz.initiate(sessionId));
        if ('data' in response) {
            return response.data;
        } else {
            throw response.error;
        }
    }
);

export const submitQuizAnswer = createAsyncThunk<IQuizSession, ISubmitAnswerRequest>(
    'quizSession/submitAnswerStatus',
    async (submitAnswerRequest, { dispatch }) => {
        const response = await dispatch(quizSessionApi.endpoints.submitAnswer.initiate(submitAnswerRequest));
        if ('data' in response) {
            return response.data;
        } else {
            throw response.error;
        }
    }
);

export const submitOpenQuizAnswer = createAsyncThunk<IQuizSession, ISubmitOpenAnswerRequest>(
    'quizSession/submitOpenAnswerStatus',
    async (submitOpenAnswerRequest, { dispatch }) => {
        const response = await dispatch(quizSessionApi.endpoints.submitOpenAnswer.initiate(submitOpenAnswerRequest));
        if ('data' in response) {
            return response.data;
        } else {
            throw response.error;
        }
    }
);

export const finishQuizSession = createAsyncThunk<IQuizSession, IEndQuizSessionRequest>(
    'quizSession/endStatus',
    async (endQuizRequest, { dispatch }) => {
        const response = await dispatch(quizSessionApi.endpoints?.endQuiz.initiate(endQuizRequest));
        if ('data' in response) {
            return response.data;
        } else {
            throw response.error;
        }
    }
);

const quizSessionSlice = createSlice({
    name: 'quizSession',
    initialState,
    reducers: {
        resetSession: (state) => {
            state.session = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuizSessionById.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = 'succeeded';
                state.session = action.payload;
            })
            .addCase(startQuizSession.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = 'succeeded';
                state.session = action.payload;
            })
            .addCase(submitQuizAnswer.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = 'succeeded';
                state.session = action.payload;
            })
            .addCase(submitOpenQuizAnswer.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = 'succeeded';
                state.session = action.payload;
            })
            .addCase(finishQuizSession.fulfilled, (state, action: PayloadAction<IQuizSession>) => {
                state.status = 'succeeded';
                state.session = action.payload;
            });
    },
});

export const {resetSession} = quizSessionSlice.actions;

export default quizSessionSlice.reducer;