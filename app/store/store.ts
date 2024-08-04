import loginSlice from "@/app/(tabs)/login/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import inventorySlice from "../(tabs)/inventory/InventorySlice";
import themeSlice from "../../components/util/themeSlice";
import ItemSlice from "../(tabs)/items/ItemSlice";


const store = configureStore({
    reducer: {
        login: loginSlice,
        inventory: inventorySlice,
        theme: themeSlice,
        item: ItemSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };