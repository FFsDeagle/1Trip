import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import axios, { AxiosResponse } from "axios";

// Login state structure
export interface loginState {
    loginState: boolean,
    loading: boolean,
    error: string | undefined,
    status: 'idle' | 'loading' | 'failed' | 'success'
    logoutResponse: LogoutResponse,
    loginResponse: User,
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
    loginResponse: {} as User,
}

// Props for User Login
export interface LoginProps {
    firstName?: string,
    lastName?: string,
    email: string,
    password?: string,
}

// User Account Data
export interface LoginResponse  {
    id: string,
    firstName: string,
    lastName: string,
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
    token: string,
}

// const testLoginResponse: LoginResponse = {
//     id: '1234',
//     username: 'Test',
//     firstName: 'Test',
//     lastName: 'Test',
//     email: 'test@gmail.com',
//     authToken: 'aXsidJh87sa08auWsoihd',
//     tokenExpiry: new Date(Date.now() + 3600000).toISOString(),
//     statusCode: '200',
// }

export const forgotPassword = createAsyncThunk(
    'login/forgotPassword',
    async ({ email }: LoginProps) => {
        console.log("Attempting to send password reset email to:", email);
        const response = await axios.post('http://192.168.1.116:5000/recover/forgotPassword', { email })
        return response.data;
    }
)

export const verifyAuthToken = createAsyncThunk(
    'login/verifyAuthToken',
    async (authToken: string) => {
        // return testLoginResponse;
        const response = await axios.post('http://192.168.1.116:5000/account/verifyAuthToken', { authToken })
        return response.data;
    }
)

export const createAccount = createAsyncThunk(
    'login/createAccount',
    async ({ firstName, lastName, email, password }: LoginProps) => {
        console.log("Attempting to create account with email:", email);
        const response = await axios.post('http://192.168.1.116:5000/account/signUp', { firstName, lastName, email, password })
        return response.data;
    }
)

// Function for logging in
export const loginAsync = createAsyncThunk(
    'login/loginAsync',
    async ({ email, password }: LoginProps) => {
        // return testLoginResponse as LoginResponse;
        console.log("Attempting to sign in with email:", email);
        const response = await axios.post('http://192.168.1.116:5000/account/login', { email, password })
        return response.data;
    }
)

// Function for logging out
export const logoutAsync = createAsyncThunk(
    'login/logoutAsync',
    // No need to define a interface here as we are only passing 1 argument of type string
    async (id: string) => {
        const response = await axios.post('http://192.168.1.116:5000/account/logout', { id })
        return response.data;
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
                state.loginResponse = {} as User;
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
                state.loginResponse.token = action.payload.authToken;
            }
        })
        .addCase(verifyAuthToken.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(verifyAuthToken.fulfilled, (state, action: PayloadAction<User>) => {
            state.loginResponse.id = action.payload.id;
            state.loginResponse.token = action.payload.token;
            state.loginResponse.email = action.payload.email;
            state.loginResponse.firstName = action.payload.firstName;
            state.loginResponse.lastName = action.payload.lastName;
            state.loginState = true;
            state.status = 'success';
        })
        .addCase(verifyAuthToken.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export default loginSlice.reducer;