import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import groupReducer from "../features/group/groupSlice";

const store = configureStore({
    reducer: {
        auth : authReducer,
        group: groupReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;