import {configureStore} from "@reduxjs/toolkit";
import shopReducer from './slices/shopSlice.ts'

export const store = configureStore({
    reducer: {
        shops: shopReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
