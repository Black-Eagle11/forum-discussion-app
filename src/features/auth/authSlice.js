import { createSlice } from '@reduxjs/toolkit';
import asyncStatus from '../../utils/asyncStatus';
import {
  registerUser,
  loginUser,
  fetchOwnProfile,
} from './authThunks';
import { removeAccessToken } from '../../utils/auth';

const initialState = {
  user: null,

  status: asyncStatus.IDLE,
  error: null,

  // penting untuk ProtectedRoute
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.status = asyncStatus.IDLE;
      state.error = null;
      state.isAuthChecked = true;
      removeAccessToken();
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.status = asyncStatus.LOADING;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = asyncStatus.SUCCESS;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.payload || 'Registrasi gagal';
      })

      .addCase(loginUser.pending, (state) => {
        state.status = asyncStatus.LOADING;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = asyncStatus.SUCCESS;
        // user akan di-set oleh fetchOwnProfile
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.payload || 'Login gagal';
        state.isAuthChecked = true;
      })

      .addCase(fetchOwnProfile.pending, (state) => {
        state.status = asyncStatus.LOADING;
      })
      .addCase(fetchOwnProfile.fulfilled, (state, action) => {
        state.status = asyncStatus.SUCCESS;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchOwnProfile.rejected, (state, action) => {
        state.status = asyncStatus.ERROR;
        state.error = action.payload || null;
        state.user = null;
        state.isAuthChecked = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
