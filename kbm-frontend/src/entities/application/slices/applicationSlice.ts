import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ApplicationStatus, IApplication, IEducation, IExperience, IScheduleInterviewDetails } from '..'
import { IUserDetail } from '@/entities/user'
import { IPosition } from '@/entities/position'
import { IEmployee } from '../model/IEmployee'

// Define a function to initialize the authentication state from cookies
const initializeApplicationState = () => {
    return {
        id: '',
        status: ApplicationStatus.IN_PROCESS,
        user: {} as IUserDetail,
        desiredPositions: [] as IPosition[],
        employee: {} as IEmployee,
        experiences: [] as IExperience[],
        educations: [] as IEducation[],
        interviewDetails: {} as IScheduleInterviewDetails,
        videoUrl: '',
    };
};

// Load the initial state from cookies
const initialState = initializeApplicationState();

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplicationData: (state, action: PayloadAction<IApplication>) => {
            const { payload } = action;
            state.id = payload.id;
            state.status = payload.status;
            state.user = payload.user;
            state.desiredPositions = payload.desiredPositions;
            state.employee = payload.employee;
            state.experiences = payload.experiences;
            state.educations = payload.educations;
            state.interviewDetails = payload.interviewDetails;
            state.videoUrl = payload.videoUrl;
        },
        deleteDesiredPosition: (state, action: PayloadAction<IPosition>) => {
            const positionToDelete = action.payload;
            state.desiredPositions = state.desiredPositions.filter(desiredPosition => desiredPosition.id !== positionToDelete.id);
        },
    },
});

export default applicationSlice.reducer;
export const {
    setApplicationData,
    deleteDesiredPosition,
} = applicationSlice.actions;
