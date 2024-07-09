import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./slices/darkModeSlice";
import { authAPI } from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi as usersAPI } from "./api/usersApi";
import { roleAPI } from "./api/roleApi";
import { departmentAPI } from "./api/departmentApi";
import { positionAPI } from "./api/positionApi";
import { termAPI } from "./api/termApi";
import { plansApi } from "./api/plansApi";
import { annualAPI } from "./api/annualsAPI";
import { statusAPI } from "./api/statusApi";
import { costTypeAPI } from "./api/costTypeAPI";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [roleAPI.reducerPath]: roleAPI.reducer,
    [departmentAPI.reducerPath]: departmentAPI.reducer,
    [positionAPI.reducerPath]: positionAPI.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [termAPI.reducerPath]: termAPI.reducer,
    [annualAPI.reducerPath]: annualAPI.reducer,
    [statusAPI.reducerPath]: statusAPI.reducer,
    [costTypeAPI.reducerPath]: costTypeAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      usersAPI.middleware,
      roleAPI.middleware,
      departmentAPI.middleware,
      positionAPI.middleware,
      plansApi.middleware,
      termAPI.middleware,
      annualAPI.middleware,
      statusAPI.middleware,
      costTypeAPI.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
