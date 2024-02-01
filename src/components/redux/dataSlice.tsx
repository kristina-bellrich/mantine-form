import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { sendData } from 'components/api/Api'

const initialState = { loading: false, error: null, active: 0 }

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetUsers: () => initialState,
    setActive: (state, action: PayloadAction<number>) => {
      state.active = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendData.fulfilled, (state) => {
        state.loading = false
        state.error = null
      })
      .addCase(sendData.rejected, (state) => {
        state.loading = false
      })
  },
})

export const dataSliceReducer = dataSlice.reducer
export const dataSliceActions = dataSlice.actions
