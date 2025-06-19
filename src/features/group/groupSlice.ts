import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createGroup, addMember, addExpense, exitGroup } from './groupApi';

interface GroupState {
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: GroupState = {
  loading: false,
  error: null,
  message: null,
};

// Thunks
export const createGroupThunk = createAsyncThunk(
  'group/create',
  async (payload: { title: string; description: string }, thunkAPI) => {
    try {
      const res = await createGroup(payload);
      return res.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addMemberThunk = createAsyncThunk(
  'group/addMember',
  async (payload: { name: string; title: string }, thunkAPI) => {
    try {
      const res = await addMember(payload);
      return res.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addExpenseThunk = createAsyncThunk(
  'group/addExpense',
  async (payload: { groupTitle: string; title: string; amount: number; paidByName: string }, thunkAPI) => {
    try {
      const res = await addExpense(payload);
      return res.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const exitGroupThunk = createAsyncThunk(
  'group/exit',
  async (payload: { groupTitle: string }, thunkAPI) => {
    try {
      const res = await exitGroup(payload);
      return res.message;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Slice
const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const thunks = [
      createGroupThunk,
      addMemberThunk,
      addExpenseThunk,
      exitGroupThunk,
    ];

    thunks.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state.message = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    });
  },
});

export const { clearMessage } = groupSlice.actions;
export default groupSlice.reducer;