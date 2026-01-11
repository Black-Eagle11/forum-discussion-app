import { createAsyncThunk } from '@reduxjs/toolkit';
import dicodingForumApi from '../../api/dicodingForumApi';

const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const { users } = await dicodingForumApi.getAllUsers();
    return users;
  },
);

export { fetchAllUsers };
