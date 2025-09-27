import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./slices/auth-slice"
import { uiSlice } from "./slices/ui-slice"
import { dataSlice } from "./slices/data-slice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "data/fetchItems/pending",
          "data/createItem/pending",
          "data/updateItem/pending",
          "data/deleteItem/pending",
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
