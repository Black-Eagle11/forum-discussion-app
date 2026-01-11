import { createAsyncThunk } from '@reduxjs/toolkit';
import dicodingForumApi from '../../api/dicodingForumApi';

/**
 * Fetch semua thread
 */
export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { rejectWithValue }) => {
    try {
      const { threads } = await dicodingForumApi.getAllThreads();
      return threads;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal mengambil thread');
    }
  }
);

/**
 * Membuat thread baru
 */
export const createNewThread = createAsyncThunk(
  'threads/createNewThread',
  async ({ title, body, category }, { rejectWithValue }) => {
    try {
      const { thread } = await dicodingForumApi.createThread({
        title,
        body,
        category,
      });
      return thread;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal membuat thread');
    }
  }
);

/**
 * Vote thread (up / down / neutral)
 */
export const voteThread = createAsyncThunk(
  'threads/voteThread',
  async ({ threadId, userId, voteType }, { rejectWithValue }) => {
    try {
      if (voteType === 1) {
        await dicodingForumApi.upVoteThread(threadId);
      } else if (voteType === -1) {
        await dicodingForumApi.downVoteThread(threadId);
      } else {
        await dicodingForumApi.neutralVoteThread(threadId);
      }

      return { threadId, userId, voteType };
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal melakukan vote');
    }
  }
);
