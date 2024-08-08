import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";


// Interfaces here are slice related and can be used outside of the slice where required
export interface InventoryState {
    status: 'idle' | 'loading' | 'failed' | 'success'
    items: InventoryItem[],
}

export const initialState: InventoryState = {
    status: 'idle',
    items: [] as InventoryItem[],
}
// id: string,
// name: string,
// description: string,
// category: string,
// quantity: number,
const testState: InventoryItem[] = [
    {
        id: '1',
        name: 'test1',
        description: 'test1',
        category: 'test1',
        isFavorite: true,
    },
    {
        id: '2',
        name: 'test2',
        description: 'test2',
        category: 'test2',
        isFavorite: true,
    },
    {
        id: '3',
        name: 'test3',
        description: 'test3',
        category: 'test3',
        isFavorite: true,
    },
    {
        id: '4',
        name: 'test4',
        description: 'test4',
        category: 'test4',
        isFavorite: true,
    },
    {
        id: '5',
        name: 'test5',
        description: 'test5',
        category: 'test5',
        isFavorite: true,
    },
    {
        id: '6',
        name: 'test6',
        description: 'test6',
        category: 'test6',
        isFavorite: true,
    },
    {
        id: '7',
        name: 'test7',
        description: 'test7',
        category: 'test7',
        isFavorite: false,
    },
    {
        id: '8',
        name: 'test8',
        description: 'test8',
        category: 'test8',
        isFavorite: false,
    },
    {
        id: '9',
        name: 'test9',
        description: 'test9',
        category: 'test9',
        isFavorite: false,
    },
    {
        id: '10',
        name: 'test10',
        description: 'test10',
        category: 'test10',
        isFavorite: false,
    },
    {
        id: '11',
        name: 'test11',
        description: 'test11',
        category: 'test11',
        isFavorite: false,
    },
    {
        id: '12',
        name: 'test12',
        description: 'test12',
        category: 'test12',
        isFavorite: false,
    },
    {
        id: '13',
        name: 'test13',
        description: 'test13',
        category: 'test13',
        isFavorite: false,
    },
    {
        id: '14',
        name: 'test14',
        description: 'test14',
        category: 'test14',
        isFavorite: false,
    },
]

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    category: string,
    isFavorite: boolean,
}

export interface InventoryResponse {
    status: boolean,
}

// Add item to inventory list in database
export const addItem = createAsyncThunk(
    'item/addItem',
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
    'item/itemCategorySearch',
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
    'item/itemSearch',
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

export const getItemList = createAsyncThunk(
    'item/getItemList',
    async () => {
        return testState;
        return axios.get('http://localhost:5000/inventory/getItemList')
        .then((response: AxiosResponse<InventoryItem[]>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when getting item list", error);
            return error;
        })
    }
)

export const inventorySlice = createSlice({
    name: 'item',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addItem.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addItem.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
        builder.addCase(addItem.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(itemCategorySearch.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(itemCategorySearch.fulfilled, (state, action) => {
            state.items = action.payload;
        })
        builder.addCase(itemCategorySearch.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(itemSearch.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(itemSearch.fulfilled, (state, action) => {
            state.items = action.payload;
        })
        builder.addCase(itemSearch.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(getItemList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getItemList.fulfilled, (state, action) => {
            state.status = 'success';
            state.items = action.payload;
        })
        builder.addCase(getItemList.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default inventorySlice.reducer;