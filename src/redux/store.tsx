import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataSlice'
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store
