// src/app/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";

import authReducer from "../features/authSlice";
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { progressApi } from "@/features/api/progressApi";

// ✅ Persist config for the auth slice (includes token)
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated", "token"], // ✅ Ensure token is persisted
};

// ✅ Wrap authReducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// ✅ Combine all reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [progressApi.reducerPath]: progressApi.reducer,
  auth: persistedAuthReducer,
});

// ✅ Create the store with middleware setup
export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required by redux-persist
    }).concat(
      authApi.middleware,
      courseApi.middleware,
      progressApi.middleware
    ),
});

// ✅ Export persistor for use in <PersistGate>
export const persistor = persistStore(appStore);
