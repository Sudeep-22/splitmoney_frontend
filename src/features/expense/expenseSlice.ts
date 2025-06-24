import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addExpense, fetchAllExpense } from './expenseApi';

export const addExpenseThunk = createAsyncThunk(
  'expense/addExpense',
  async (expenseData: {
      groupId: string;
      expense: {
        title: string;
        amount: number;
        paidById: string;
      };
      contributions: {
        paidToUserId: string;
        amount: number;
      }[];
    }, thunkAPI) => {
    try {
      return await addExpense(expenseData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllExpenseThunk = createAsyncThunk(
  'expense/fetchAllExpense',
  async (groupData: { groupId: string }, thunkAPI) => {
    try {
      return await fetchAllExpense(groupData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

interface Expense {
  title: string;
  amount: number;
  paidByName: string;
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    clearExpenseError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addExpenseThunk.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllExpenseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.expenses = action.payload;
      })
      .addCase(fetchAllExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearExpenseError } = expenseSlice.actions;

export default expenseSlice.reducer;