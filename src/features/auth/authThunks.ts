import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveToken, clearToken, saveUser } from "./authUtils";
import { fetchWithAuth } from "../fetchWithAuth";

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
      const res = await fetch("http://localhost:5000/api/auth/register", {
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
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
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
      const res = await fetch("http://localhost:5000/api/auth/refreshToken", {
        method: "POST",
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
      await fetch("http://localhost:5000/api/auth/logOut", {
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
      const res = await fetchWithAuth(
        "http://localhost:5000/api/auth/deleteUser",
        {
          method: "DELETE",
        }
      );

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
  async (_, thunkAPI) => {
    try {
      const res = await fetchWithAuth(
        "http://localhost:5000/api/auth/fetchAllUsers",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch users");
      return data.users;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
