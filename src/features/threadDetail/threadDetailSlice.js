import { createSlice } from '@reduxjs/toolkit';
import asyncStatus from '../../utils/asyncStatus';
import {
  fetchThreadDetail,
  createNewComment,
  voteComment,
} from './threadDetailThunks';
import { applyVote } from '../../utils/optimistic';

const initialState = {
  thread: null,
  status: asyncStatus.IDLE,
  error: null,
};

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearThreadDetail(state) {
      state.thread = null;
      state.status = asyncStatus.IDLE;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchThreadDetail.pending, (state) => {
        state.status = asyncStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.status = asyncStatus.SUCCESS;
        state.thread = action.payload;
      })
      .addCase(fetchThreadDetail.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.payload || 'Gagal memuat detail thread';
      })

      .addCase(createNewComment.fulfilled, (state, action) => {
        state.thread.comments.push(action.payload);
      })

      .addCase(voteComment.pending, (state, action) => {
        const { commentId, userId, voteType } = action.meta.arg;

        const comment = state.thread?.comments.find(
          (c) => c.id === commentId,
        );

        if (!comment) return;

        const updatedVotes = applyVote({
          upVotesBy: comment.upVotesBy,
          downVotesBy: comment.downVotesBy,
          userId,
          voteType,
        });

        comment.upVotesBy = updatedVotes.upVotesBy;
        comment.downVotesBy = updatedVotes.downVotesBy;
      })

      .addCase(voteComment.rejected, (state, action) => {
        state.error = action.payload || 'Gagal melakukan vote komentar';
      });
  },
});

export const { clearThreadDetail } = threadDetailSlice.actions;
export default threadDetailSlice.reducer;
