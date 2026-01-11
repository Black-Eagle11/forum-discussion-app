import { createSlice } from '@reduxjs/toolkit';
import asyncStatus from '../../utils/asyncStatus';
import { fetchAllUsers } from './usersThunks';

const initialState = {
  list: [],
  status: asyncStatus.IDLE,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllUsers.pending, (state) => {
        state.status = asyncStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = asyncStatus.SUCCESS;
        state.list = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.payload || 'Gagal memuat data pengguna';
      });
  },
});

export default usersSlice.reducer;
