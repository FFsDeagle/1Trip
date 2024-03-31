import loginSlice from "@/app/(tabs)/login/loginSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

const store = configureStore({
    reducer: {
        login: loginSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };