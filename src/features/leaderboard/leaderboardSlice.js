import { createSlice } from '@reduxjs/toolkit';
import asyncStatus from '../../utils/asyncStatus';
import { fetchLeaderboards } from './leaderboardThunks';

const initialState = {
  list: [],
  status: asyncStatus.IDLE,
  error: null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(fetchLeaderboards.pending, (state) => {
        state.status = asyncStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.status = asyncStatus.SUCCESS;
        state.list = action.payload;
      })
      .addCase(fetchLeaderboards.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error =
          action.payload || 'Gagal memuat data leaderboard';
      });
  },
});

export default leaderboardSlice.reducer;
