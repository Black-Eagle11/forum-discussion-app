import { createAsyncThunk } from '@reduxjs/toolkit';
import dicodingForumApi from '../../api/dicodingForumApi';

const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetchThreadDetail',
  async (threadId, { rejectWithValue }) => {
    try {
      const { detailThread } = await dicodingForumApi.getThreadDetail(threadId);
      return detailThread;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal memuat detail thread');
    }
  },
);

const createNewComment = createAsyncThunk(
  'threadDetail/createNewComment',
  async ({ threadId, content }, { rejectWithValue }) => {
    try {
      const { comment } = await dicodingForumApi.createComment({
        threadId,
        content,
      });
      return comment;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menambahkan komentar');
    }
  },
);

const voteComment = createAsyncThunk(
  'threadDetail/voteComment',
  async (
    { threadId, commentId, voteType, userId },
    { rejectWithValue },
  ) => {
    try {
      if (voteType === 1) {
        await dicodingForumApi.upVoteComment({ threadId, commentId });
      } else if (voteType === -1) {
        await dicodingForumApi.downVoteComment({ threadId, commentId });
      } else {
        await dicodingForumApi.neutralVoteComment({ threadId, commentId });
      }

      // payload ini penting untuk reducer optimistic
      return { commentId, voteType, userId };
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal melakukan vote komentar');
    }
  },
);

export {
  fetchThreadDetail,
  createNewComment,
  voteComment,
};
