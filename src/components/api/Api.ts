import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { FormData } from '../types/types';

import { setErrorModal, setShowModal } from 'components/redux/modalSlice';

const apiInstance = axios.create({
  baseURL: 'https://api.sbercloud.ru/content/v1/bootcamp/frontend',
});

export const sendData = createAsyncThunk(
  'data/sendData',
  async (data: FormData, { dispatch }) => {
    try {
      dispatch(setShowModal(true));
      await apiInstance.post('', data);
    } catch (error) {
      dispatch(setErrorModal(true));
      throw error;
    }
  },
);
