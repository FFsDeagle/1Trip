import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store/store";
import axios, { AxiosResponse } from "axios";


// Interfaces here are slice related and can be used outside of the slice where required
export interface InventoryState {
    showHeader: boolean,
    status: 'idle' | 'loading' | 'failed' | 'success'
    inventoryItems: InventoryItem[],
}

export const initialState: InventoryState = {
    showHeader: true,
    status: 'idle',
    inventoryItems: [],
}

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    category: string,
}

export interface InventoryResponse {
    status: boolean,
}

// Add item to inventory list in database
export const addItem = createAsyncThunk(
    'invenotry/addItem',
    async ({ category, description, name }: InventoryItem) => {
        return axios.post('http://localhost:5000/inventory/addItem', { params: ({ category, description, name })})
        .then((response: AxiosResponse<InventoryResponse>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when adding item", error);
            return error;
        })
    }
)

// Item Search by Category
export const itemCategorySearch = createAsyncThunk(
    'invenotry/itemCategorySearch',
    async (searchValue : string) => {
        return axios.post('http://localhost:5000/inventory/itemCategorySearch', { params: ({ searchValue })})
        .then((response: AxiosResponse<InventoryItem[]>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when searching for item", error);
            return error;
        })
    }
)

// Item Search by Name/Category
export const itemSearch = createAsyncThunk(
    'invenotry/itemSearch',
    async (searchValue : string) => {
        return axios.post('http://localhost:5000/inventory/itemSearch', { params: ({ searchValue })})
        .then((response: AxiosResponse<InventoryItem[]>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when searching for item", error);
            return error;
        })
    }
)

export const inventorySlice = createSlice({
    name: 'invenotry',
    initialState: initialState,
    reducers: {
        // Change state for showing header
        showHeader: (state, action: PayloadAction<boolean>) => {
            state.showHeader = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addItem.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.inventoryItems.push(action.payload);
        })
        builder.addCase(addItem.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(itemCategorySearch.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(itemCategorySearch.fulfilled, (state, action) => {
            state.inventoryItems = action.payload;
        })
        builder.addCase(itemCategorySearch.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(itemSearch.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(itemSearch.fulfilled, (state, action) => {
            state.inventoryItems = action.payload;
        })
        builder.addCase(itemSearch.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export const { showHeader } = inventorySlice.actions;
export default inventorySlice.reducer;