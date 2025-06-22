import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createGroup, addMember, addExpense, exitGroup, fetchGroup, fetchMembers } from './groupApi';

interface Group {
  _id: string;
  title: string;
  description: string;
}

// Extend your GroupState
interface GroupState {
  loading: boolean;
  error: string | null;
  message: string | null;
  groups: Group[];
  members: string[]; 
}


const initialState: GroupState = {
  loading: false,
  error: null,
  message: null,
  groups: [],
  members: [],
};

// Thunks
export const fetchGroupThunk = createAsyncThunk<Group[], void, { rejectValue: string }>(
  'group/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await fetchGroup(); 
      return res; 
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchMembersThunk = createAsyncThunk<string[],                              // Return type
  { groupId: string }, { rejectValue: string }>(
  'group/fetchMembers',
  async (payload: { groupId: string}, thunkAPI) => {
    try {
      const res = await fetchMembers(payload); 
      return res; 
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

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
  async (payload: { name: string; groupId: string }, thunkAPI) => {
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
  async (payload: { groupId: string }, thunkAPI) => {
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

  // ✅ Add fetchGroupThunk separately (not inside loop)
  builder
    .addCase(fetchGroupThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchGroupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = action.payload;
    })
    .addCase(fetchGroupThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    .addCase(fetchMembersThunk.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(fetchMembersThunk.fulfilled, (state, action) => {
    state.loading = false;
    state.members = action.payload;
  })
  .addCase(fetchMembersThunk.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload as string;
  });
}
});

export const { clearMessage } = groupSlice.actions;
export default groupSlice.reducer;