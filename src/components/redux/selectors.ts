import { RootState } from './store'

export const selectShowModal = (state: RootState) => state.modal.showModal
export const selectErrorModal = (state: RootState) => state.modal.errorModal
export const selectActive = (state: RootState) => state.data.active
