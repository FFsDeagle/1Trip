import axios, { AxiosResponse } from 'axios';
import { LoginProps, LoginResponse, LogoutResponse } from "./loginSlice";

export async function signInWithCredentials({ userName, password }: LoginProps) {
    axios.post('http://localhost:5000/account/login', { params: ({ userName, password })})
    .then((response: AxiosResponse<LoginResponse>) => {
        return response;
    }).catch((error) => {
        console.log("Error occurred when attempting to sign in:", error);
        return error;
    })
}

export async function logout(id: string) {
    axios.post('http://localhost:5000/account/logout', { params: ({ id })})
    .then((response: AxiosResponse<LogoutResponse>) => {
        return response;
    }).catch(error => {
        return error;
    })
}