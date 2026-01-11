import { createSlice } from '@reduxjs/toolkit';
import asyncStatus from '../../utils/asyncStatus';
import {
  fetchThreads,
  createNewThread,
  voteThread,
} from './threadsThunks';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    list: [],
    status: asyncStatus.IDLE,
    error: null,
    categoryFilter: 'all',
  },
  reducers: {
    setCategoryFilter(state, action) {
      state.categoryFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // ===== FETCH THREADS =====
      .addCase(fetchThreads.pending, (state) => {
        state.status = asyncStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = asyncStatus.SUCCESS;
        state.list = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.error?.message || 'Gagal memuat thread';
      })

      // ===== CREATE THREAD =====
      .addCase(createNewThread.pending, (state) => {
        state.status = asyncStatus.LOADING;
      })
      .addCase(createNewThread.fulfilled, (state, action) => {
        state.status = asyncStatus.SUCCESS;
        state.list.unshift(action.payload);
      })
      .addCase(createNewThread.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.error?.message || 'Gagal membuat thread';
      })

      // ===== VOTE THREAD =====
      .addCase(voteThread.fulfilled, (state, action) => {
        const { threadId, userId, voteType } = action.payload;

        const thread = state.list.find((t) => t.id === threadId);
        if (!thread) return;

        // reset vote user
        thread.upVotesBy = thread.upVotesBy.filter((id) => id !== userId);
        thread.downVotesBy = thread.downVotesBy.filter((id) => id !== userId);

        // apply vote
        if (voteType === 1) {
          thread.upVotesBy.push(userId);
        } else if (voteType === -1) {
          thread.downVotesBy.push(userId);
        }
      });
  },
});

export const { setCategoryFilter } = threadsSlice.actions;
export default threadsSlice.reducer;
