import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveToken, clearToken, saveUser } from "./authUtils";
import { fetchWithAuth } from "../fetchWithAuth";

const apiUrl = import.meta.env.VITE_API_URL;

// 🔹 REGISTER
export const registerThunk = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
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
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
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
  "auth/refresh-Token",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${apiUrl}/auth/refreshToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const isJson = res.headers
        .get("content-type")
        ?.includes("application/json");

      const data = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        throw new Error(data.message || data || "Token refresh failed");
      }

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
export const logoutThunk = createAsyncThunk(
  "auth/logOut",
  async (_, thunkAPI) => {
    try {
      await fetch(`${apiUrl}/auth/logOut`, {
        method: "POST",
        credentials: "include",
      });
      clearToken();
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "auth/deleteUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/auth/deleteUser`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }

      clearToken();
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllUsersThunk = createAsyncThunk(
  "auth/fetchAllUsers",
  async (data: { groupId: string }, thunkAPI) => {
    try {
      const res = await fetchWithAuth(`${apiUrl}/auth/fetchAllUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();
      if (!res.ok)
        throw new Error(responseData.message || "Failed to fetch users");

      return responseData.users;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
