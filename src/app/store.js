import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './../features/api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducer]: apiSlice.reducer
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
