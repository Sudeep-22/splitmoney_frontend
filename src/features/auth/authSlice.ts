import { createSlice } from '@reduxjs/toolkit';
import type { AuthState } from './authTypes';
import {
  loginThunk,
  logoutThunk,
  registerThunk,
  refreshAccessTokenThunk,
  deleteUserThunk,
} from './authThunks';
import { getToken, getStoredUser } from './authUtils';

const initialState: AuthState = {
  user: getStoredUser(),
  accessToken: getToken(),
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = 'Registered successfully';
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.message = 'Login successful';
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Refresh
      .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(refreshAccessTokenThunk.rejected, (state, action) => {
        state.accessToken = null;
        state.error = action.payload as string;
      })

      // Logout
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.message = 'Logged out successfully';
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteUserThunk.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.message = 'Deleted user successfully';
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;