import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import jobSliceReducer from "./reducer/jobSliceReducer";
import authSliceReducer from "./reducer/authSliceReducer";
import employeeSliceReducer from "./reducer/employeeSliceReducer";
import employerSliceReducer from "./reducer/employerSliceReducer";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    jobs: jobSliceReducer,
    employee: employeeSliceReducer,
    employer: employerSliceReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }),
});
