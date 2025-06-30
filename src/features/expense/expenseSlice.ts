import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addExpense,
  fetchAllExpense,
  fetchExpenseContri,
  fetchMemberContri,
  deleteExpense,
} from "./expenseApi";

export const addExpenseThunk = createAsyncThunk(
  "expense/addExpense",
  async (
    expenseData: {
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
    },
    thunkAPI
  ) => {
    try {
      return await addExpense(expenseData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAllExpenseThunk = createAsyncThunk(
  "expense/fetchAllExpense",
  async (groupData: { groupId: string }, thunkAPI) => {
    try {
      return await fetchAllExpense(groupData);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchMemberContriThunk = createAsyncThunk(
  "expense/fetchMemberContri",
  async (data: { groupId: string }, thunkAPI) => {
    try {
      return await fetchMemberContri(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchExpenseContriThunk = createAsyncThunk(
  "expense/fetchExpenseContri",
  async (data: { expenseId: string }, thunkAPI) => {
    try {
      return await fetchExpenseContri(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteExpenseThunk = createAsyncThunk(
  "expense/deleteExpense",
  async (data: { expenseId: string }, thunkAPI) => {
    try {
      return await deleteExpense(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

interface DetailedExpense {
  expenseId: string;
  title: string;
  totalAmount: number;
  paidByUser: {
    id: string | null;
    name: string;
  };
  contributions: {
    paidToUser: {
      id: string | null;
      name: string;
    };
    amount: number;
  }[];
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  paidByName: string;
}

interface ExpenseState {
  expenses: Expense[];
  memberContributions: MemberContri[];
  expenseDetail: DetailedExpense | null;
  loading: boolean;
  error: string | null;
}

interface MemberContri {
  memberId: string;
  memberName: string;
  netAmount: number;
}

const initialState: ExpenseState = {
  expenses: [],
  memberContributions: [],
  expenseDetail: null,
  loading: false,
  error: null,
};

const expenseSlice = createSlice({
  name: "expense",
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
      })

      .addCase(fetchMemberContriThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemberContriThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.memberContributions = action.payload;
      })
      .addCase(fetchMemberContriThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchExpenseContriThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExpenseContriThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseDetail = action.payload;
      })
      .addCase(fetchExpenseContriThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(deleteExpenseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteExpenseThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.meta.arg.expenseId;
        state.expenses = state.expenses.filter((exp) => exp.id !== deletedId);
      })
      .addCase(deleteExpenseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearExpenseError } = expenseSlice.actions;

export default expenseSlice.reducer;
