import loginSlice from "@/app/(tabs)/login/loginSlice";
import { configureStore, isImmutableDefault } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import inventorySlice from "../(tabs)/inventory/InventorySlice";
import themeSlice from "../../components/util/themeSlice";
import ItemSlice from "../(tabs)/items/ItemSlice";
import shoppingListSlice from "../(tabs)/shopping/ShoppingSlice";


const store = configureStore({
    reducer: {
        login: loginSlice,
        inventory: inventorySlice,
        theme: themeSlice,
        item: ItemSlice,
        shoppingLists: shoppingListSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
            isImmutableDefault,
        })
    .concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };