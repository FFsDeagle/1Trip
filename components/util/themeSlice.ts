import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import axios, { AxiosResponse } from "axios";

// Types
export interface ThemeProps {
    status?: 'idle' | 'loading' | 'failed' | 'success',
    error?: string,
    colors: Colors,
    mode: string,
};

export interface Colors {
    primary?: string;
    secondary?: string;
    background?: string;
    background2?: string;
    background3?: string;
    textPrimary?: string;
    textSecondary?: string
    tabIconDefault?: string,
    tabIconSelected?: string,
    linearBackground?: string[],
    linearBackground2?: string[],
    iconColor?: string,
    iconColor2?: string,
    borderColor?: string,
    headerTitleColor?: string,
    tabActive: string,
    tint?: string,
}

export interface ThemeStyle {
    text: string,
    background: string,
    tint: string,
    tabIconDefault: string,
    tabIconSelected: string,
}

export const defaultTheme: ThemeProps = {
    status: 'idle',
    error: undefined,
    colors: {
      primary: 'white',
      secondary: 'rgba(0, 0, 0, 0.4)',
      background: '#1F1F1F',
      background2: '#333645',
      background3: '#B2B2B2',
      linearBackground: ['#1F1F1F', '#333645'],
      linearBackground2: ['#D7D7D1', '#9EA7AD'],
      tabIconDefault: '#ccc',
      textPrimary: '#FEFEFE',
      textSecondary: '#FEFFFF',
      iconColor: '#FF9A62',
      iconColor2: 'white',
      borderColor: '1F1F1F',
      headerTitleColor: 'white',
      tint: '#EFEFE9',
      tabActive: '#B2B2B2',
    } as Colors,
    mode: 'default',
};

export const initialState: ThemeProps = {
    status: 'idle',
    error: undefined,
    colors: defaultTheme.colors as Colors,
    mode: defaultTheme.mode,
}

// Theme response
export interface ThemeResponse {
    theme: ThemeProps
}

// This will fail for now, default value will be set to defaultTheme
export const getTheme = createAsyncThunk(
    'theme/getTheme',
    async () => {
        return defaultTheme;
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
            state.colors = action.payload.colors;
            state.mode = action.payload.mode;
            state.status = "success";
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
            state.mode = action.payload.data.theme.mode;
            state.status = "success";
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
export const selectColors = (state: RootState) => state.theme.colors;

export default themeSlice.reducer;