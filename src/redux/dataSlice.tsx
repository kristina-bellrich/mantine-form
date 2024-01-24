import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FormData } from '../types/data';

const initialState={loading:false, error:null}

export const sendData = createAsyncThunk('data/sendData', async (data: any) => {
  try {
    await axios.post('https://api.sbercloud.ru/content/v1/bootcamp/frontend', data);
    return true;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
});



const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetUsers:()=>initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendData.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendData.rejected, (state, action) => {
        state.loading = false;

      });
  },
});

export default dataSlice.reducer;
