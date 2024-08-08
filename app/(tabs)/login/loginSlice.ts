import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { signInWithCredentials, logout } from "./loginAPI";
import axios, { AxiosResponse } from "axios";

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
    username: string,
    authToken: string,
    tokenExpiry: string,
    isLoggedIn: boolean,
    // Other data goes here
}

// Logout response
export interface LogoutResponse {
    status: boolean,
}

const testLoginResponse: LoginResponse = {
    id: '1234',
    username: 'Test',
    authToken: 'aXsidJh87sa08auWsoihd',
    tokenExpiry: new Date(Date.now() + 360000).toDateString(),
    isLoggedIn: false,
}

export const verifyAuthToken = createAsyncThunk(
    'login/verifyAuthToken',
    async (id: string) => {
        return testLoginResponse;
        return axios.post('http://localhost:5000/account/verifyAuthToken', { params: ({ id })})
        .then((response: AxiosResponse<LoginResponse>) => {
            return response;
        }).catch(error => {
            return error;
        })
    }
)

export const createAccount = createAsyncThunk(
    'login/createAccount',
    async ({ userName, password }: LoginProps) => {
        return axios.post('http://localhost:5000/account/createAccount', { params: ({ userName, password })})
        .then((response: AxiosResponse<LoginResponse>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when attempting to create account:", error);
            return error;
        })
    }
)

// Function for logging in
export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async ({ userName, password }: LoginProps) => {
        return testLoginResponse;
        return axios.post('http://localhost:5000/account/login', { params: ({ userName, password })})
        .then((response: AxiosResponse<LoginResponse>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when attempting to sign in:", error);
            return error;
        })
    }
)

// Function for logging out
export const logoutAsync = createAsyncThunk(
    'login/logoutAsync',
    // No need to define a interface here as we are only passing 1 argument of type string
    async (id: string) => {
        return axios.post('http://localhost:5000/account/logout', { params: ({ id })})
        .then((response: AxiosResponse<LogoutResponse>) => {
            return response;
        }).catch(error => {
            return error;
        })
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
        .addCase(createAccount.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createAccount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createAccount.fulfilled, (state, action) => {
            state.status = 'success';
            if (action.payload) {
                state.userProps = action.payload;
            }
        })
        .addCase(verifyAuthToken.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(verifyAuthToken.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            const tokenExpiryDate = new Date(action.payload.tokenExpiry);
            if (tokenExpiryDate > new Date()) {
                state.userProps = action.payload;
                state.userProps.isLoggedIn = true;
                state.status = 'success';
            }
            else {
                state.status = 'failed';
                state.error = 'Token has expired';
            }
        })
        .addCase(verifyAuthToken.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

// Export parts of your state for easy access throughout your app
// For example this export will give you the current state of the user
export const selectUser = (state: RootState) => state.login.userProps;

export default loginSlice.reducer;