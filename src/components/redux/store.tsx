import { configureStore } from '@reduxjs/toolkit'
import { dataSliceReducer } from './dataSlice'
import { useDispatch } from 'react-redux'
import { modalReducer } from './modalSlice'

const store = configureStore({
  reducer: {
    data: dataSliceReducer,
    modal: modalReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
