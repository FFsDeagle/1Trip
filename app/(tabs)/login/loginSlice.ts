import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import { signInWithCredentials, logout } from "./loginAPI";
import axios, { AxiosResponse } from "axios";

// Login state structure
export interface loginState {
    loginState: boolean,
    loading: boolean,
    error: string | undefined,
    status: 'idle' | 'loading' | 'failed' | 'success'
    logoutResponse: LogoutResponse,
    loginResponse: LoginResponse,
}

// initialState on load
const initialState: loginState = {
    loginState: false,
    loading: false,
    error: undefined,
    status: 'idle',
    logoutResponse: {
        status: false, // Set to false by default
    } as LogoutResponse,
    loginResponse: {} as LoginResponse,
}

// Props for User Login
export interface LoginProps {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
}

// User Account Data
export interface LoginResponse  {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    authToken: string,
    tokenExpiry: string,
    statusCode: string
}

// Logout response
export interface LogoutResponse {
    status: boolean,
}

interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    authToken: string,
    tokenExpiry: string,
    statusCode: string
}

const testLoginResponse: LoginResponse = {
    id: '1234',
    username: 'Test',
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@gmail.com',
    authToken: 'aXsidJh87sa08auWsoihd',
    tokenExpiry: new Date(Date.now() + 3600000).toISOString(),
    statusCode: '200',
}

export const verifyAuthToken = createAsyncThunk(
    'login/verifyAuthToken',
    async (authToken: string) => {
        // return testLoginResponse;
        return axios.post('http://localhost:5000/account/verifyAuthToken', { params: ({ authToken })})
        .then((response: AxiosResponse<LoginResponse>) => {
            return response.data.authToken;
        }).catch(error => {
            return error;
        })
    }
)

export const createAccount = createAsyncThunk(
    'login/createAccount',
    async ({ firstName, lastName, email, password }: LoginProps) => {
        return axios.post('http://localhost:5000/account/createAccount', { params: ({ firstName, lastName, email, password })})
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
    async ({ email, password }: LoginProps) => {
        // return testLoginResponse as LoginResponse;
        return axios.post('http://localhost:5000/account/login', { params: ({ email, password })})
        .then((response: AxiosResponse<User>) => {
            return response.data;
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
        .addCase(loginAsync.rejected, (state) => {
            state.status = "failed"
        })
        .addCase(loginAsync.fulfilled, (state, action: PayloadAction<User>) => {
            state.loginResponse = action.payload;
            state.loginState = true;
            // state.status = 'success';
            // if (action.payload.statusCode === '200') {
            //     state.loginResponse = action.payload;
            //     state.loginState = true;
            //     state.status = 'success';
            // }
            // else {
            //     state.status = 'failed';
            //     state.error = action.payload.statusCode;
            // }
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
                state.loginResponse = {} as LoginResponse;
            }
        })
        .addCase(createAccount.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createAccount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createAccount.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.status = 'success';
            if (action.payload) {
                state.loginResponse.authToken = action.payload.authToken;
            }
        })
        .addCase(verifyAuthToken.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(verifyAuthToken.fulfilled, (state, action: PayloadAction<string>) => {
            state.loginResponse.authToken = action.payload;
            state.loginState = true;
            state.status = 'success';
        })
        .addCase(verifyAuthToken.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

// Export parts of your state for easy access throughout your app
// For example this export will give you the current state of the user
export default loginSlice.reducer;