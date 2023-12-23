import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IApplication } from "../../models/application/IApplication.ts";
import {IUserDetail} from "../../models/user/IUserDetail.ts";
import {IPosition} from "../../models/position/IPosition.ts";
import {IEmployee} from "../../models/employee/IEmployee.ts";
import {IExperience} from "../../models/application/IExperience.ts";
import {IEducation} from "../../models/application/IEducation.ts";
import {ApplicationStatus} from "../../models/application/ApplicationStatus.ts";

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
        videoUrl: "",
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
