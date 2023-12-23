import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
    modals: {
        id: string;
        isOpen: boolean;
    }[];
}

const initialState: ModalState = {
    modals: [],
};


const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const { id } = action.payload;
            state.modals.push({ id, isOpen: true });
        },
        closeModal: (state, action) => {
            const { id } = action.payload;
            const modalIndex = state.modals.findIndex((modal) => modal.id === id);
            if (modalIndex !== -1) {
                state.modals.splice(modalIndex, 1);
            }
        },
    },
});


export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
