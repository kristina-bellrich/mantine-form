import { RootState } from './store';

export const selectShowModal = (state: RootState): boolean => state.modal.showModal;
export const selectErrorModal = (state: RootState): boolean => state.modal.errorModal;
export const selectActive = (state: RootState): number => state.data.active;
