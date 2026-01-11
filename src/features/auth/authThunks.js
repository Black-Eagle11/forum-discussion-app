import { createAsyncThunk } from '@reduxjs/toolkit';
import dicodingForumApi from '../../api/dicodingForumApi';

const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      await dicodingForumApi.register({ name, email, password });
    } catch (error) {
      return rejectWithValue(
        error.message || 'Gagal melakukan registrasi',
      );
    }
  },
);

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await dicodingForumApi.login({ email, password });
    } catch (error) {
      return rejectWithValue(
        error.message || 'Email atau password salah',
      );
    }
  },
);

const fetchOwnProfile = createAsyncThunk(
  'auth/fetchOwnProfile',
  async (_, { rejectWithValue }) => {
    try {
      const { user } = await dicodingForumApi.getOwnProfile();
      return user;
    } catch (error) {
      return rejectWithValue(
        error.message || 'Gagal mengambil data pengguna',
      );
    }
  },
);

export {
  registerUser,
  loginUser,
  fetchOwnProfile,
};
