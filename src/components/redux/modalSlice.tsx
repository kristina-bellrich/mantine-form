import { createSlice } from '@reduxjs/toolkit';

const initialState = { showModal: false, errorModal: false };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setErrorModal: (state, action) => {
      state.errorModal = action.payload;
    },
  },
});

export const { setShowModal, setErrorModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
