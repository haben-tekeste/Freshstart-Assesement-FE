import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { itemsApi } from "@services/item";

const reducers = combineReducers({
  [itemsApi.reducerPath]: itemsApi.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["itemApi/executeQuery/fulfilled"],
        // Optionally, ignore paths in the state
        ignoredPaths: ["itemApi"],
      },
    }).concat(itemsApi.middleware),
});
