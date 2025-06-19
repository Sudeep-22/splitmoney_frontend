import { createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, clearToken,saveUser } from './authUtils';

// 🔹 REGISTER
export const registerThunk = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      saveToken(data.accessToken);
      saveUser(data.user);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔹 LOGIN
export const loginThunk = createAsyncThunk(
  'auth/login',
  async ({ name, password }: { name: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      saveToken(data.accessToken);
      saveUser(data.user);
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔹 REFRESH
export const refreshAccessTokenThunk = createAsyncThunk(
  'auth/refresh-Token',
  async (_, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/refresh-Token', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Token refresh failed');
      saveToken(data.accessToken);
      saveUser(data.user);
      return {
        accessToken: data.accessToken,
        user: data.user,
      };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// 🔹 LOGOUT
export const logoutThunk = createAsyncThunk('auth/logOut', async (_, thunkAPI) => {
  try {
    await fetch('http://localhost:5000/api/auth/logOut', {
      method: 'POST',
      credentials: 'include',
    });
    clearToken();
    return true;
  } catch (err: any) {
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

export const deleteUserThunk = createAsyncThunk(
  'auth/deleteUser',
  async (_, thunkAPI) => {
    let token = localStorage.getItem('token');

    const tryDelete = async (accessToken: string) => {
      const res = await fetch('http://localhost:5000/api/auth/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': accessToken,
        },
        credentials: 'include',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Delete failed');
      }

      return res;
    };

    try {
      await tryDelete(token || '');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } catch (err: any) {
      if (err.message === 'Token is not valid' || err.message === 'jwt expired') {
        // Token expired — refresh and retry
        const result = await thunkAPI.dispatch(refreshAccessTokenThunk() as any);
        if (refreshAccessTokenThunk.fulfilled.match(result)) {
          const newToken = result.payload.accessToken;
          await tryDelete(newToken);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          return true;
        } else {
          return thunkAPI.rejectWithValue('Token refresh failed');
        }
      }

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
