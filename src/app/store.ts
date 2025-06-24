import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import groupReducer from "../features/group/groupSlice";
import expenseReducer from "../features/expense/expenseSlice"

const store = configureStore({
    reducer: {
        auth : authReducer,
        group: groupReducer,
        expense: expenseReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;