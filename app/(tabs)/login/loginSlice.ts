import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { signInWithCredentials, logout } from "./loginAPI";

// Login state structure
export interface loginState {
    loginState: boolean,
    loading: boolean,
    isLoggedIn?: false,
    error: string | undefined,
    status: 'idle' | 'loading' | 'failed' | 'success'
    userProps: LoginResponse,
    logoutResponse: LogoutResponse,
}

// initialState on load
const initialState: loginState = {
    loginState: false,
    loading: false,
    error: undefined,
    status: 'idle',
    userProps: {} as LoginResponse , // Declare an empty UserProps for initial state
    logoutResponse: {
        status: false, // Set to false by default
    } as LogoutResponse,
}

// Props for User Login
export interface LoginProps {
    userName: string,
    password: string,
}

// User Account Data
export interface LoginResponse  {
    id: string,
    name: string,
    tokenExpiry: Date,
    // Other data goes here
}

// Logout response
export interface LogoutResponse {
    status: boolean,
}

// Function for logging in
export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async ({ userName, password }: LoginProps) => {
        const response = await signInWithCredentials({ userName, password});
        return response as LoginResponse | undefined;
    }
)

// Function for logging out
export const logoutAsync = createAsyncThunk(
    'login/logoutAsync',
    // No need to define a interface here as we are only passing 1 argument of type string
    async (id: string) => {
        const response = await logout(id);
        return response as LogoutResponse | undefined;
    }
)

// Response types: Based on response you can allow mutation of your state by using actions
// Actions are structured using interfaces and passed into your api to return the response you need
export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginAsync.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message;
        })
        .addCase(loginAsync.fulfilled, (state, action) => {
            state.status = 'success';
            if (action.payload) {
                state.userProps = action.payload;
            }
        })
        .addCase(logoutAsync.pending, (state) => {
            state.status = 'idle';
        })
        .addCase(logoutAsync.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(logoutAsync.fulfilled, (state, action) => {
            state.status = 'success';
            // If status is true
            if(action.payload?.status){
                // Reset state by creating an empty object of type LoginResponse
                state.userProps = {} as LoginResponse
            }
        })
    }
})

// Export parts of your state for easy access throughout your app
// For example this export will give you the current state of the user
export const selectUser = (state: RootState) => state.login.userProps;

export default loginSlice.reducer;