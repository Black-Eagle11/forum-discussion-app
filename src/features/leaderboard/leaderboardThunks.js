import { createAsyncThunk } from '@reduxjs/toolkit';
import dicodingForumApi from '../../api/dicodingForumApi';

const fetchLeaderboards = createAsyncThunk(
  'leaderboard/fetchLeaderboards',
  async () => {
    const { leaderboards } = await dicodingForumApi.getLeaderboards();
    return leaderboards;
  },
);

export { fetchLeaderboards };
