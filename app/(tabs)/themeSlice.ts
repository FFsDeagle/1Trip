import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import axios, { AxiosResponse } from "axios";

// Types
export interface ThemeProps {
    status: 'idle' | 'loading' | 'failed' | 'success',
    error?: string,
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
};

interface Colors {
    primary: string;
    secondary: string;
    background: string;
    text: string;
}

const initialState: ThemeProps = {
    status: 'idle',
    error: undefined,
    colors: {} as Colors,
}

// Theme response
export interface ThemeResponse {
    theme: ThemeProps
}

// Default theme is currently hardcoded
export const defaultTheme: ThemeProps = {
    status: 'idle',
    error: undefined,
    colors: {
      primary: 'blue',
      secondary: 'green',
      background: '#0D2327',
      text: 'black',
    },
  };

// This will fail for now, default value will be set to defaultTheme
export const getTheme = createAsyncThunk(
    'theme/getTheme',
    async () => {
        return axios.get('http://localhost:5000/theme/getTheme')
        .then((response: AxiosResponse<ThemeResponse>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when attempting to get theme:", error);
            return error;
        })
    }
)

export const saveTheme = createAsyncThunk(
    'theme/saveTheme',
    async (theme: ThemeProps) => {
        return axios.post('http://localhost:5000/theme/saveTheme', { params: theme })
        .then((response: AxiosResponse<ThemeResponse>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when attempting to save theme:", error);
            return error;
        })
    }
)

export const themeSlice = createSlice({
    name: 'theme',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTheme.fulfilled, (state, action) => {
            state.colors = action.payload.data.theme.colors;
        })
        .addCase(getTheme.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(getTheme.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(saveTheme.fulfilled, (state, action) => {
            state.colors = action.payload.data.theme.colors;
        })
        .addCase(saveTheme.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(saveTheme.pending, (state) => {
            state.status = 'loading';
        })
    }
})

// Export parts of your state for easy access throughout your app
// For example this export will give you the current state of the user
export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;