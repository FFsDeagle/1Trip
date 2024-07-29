import loginSlice from "@/app/(tabs)/login/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import inventorySlice from "../(tabs)/inventory/InventorySlice";

const store = configureStore({
    reducer: {
        login: loginSlice,
        inventory: inventorySlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };