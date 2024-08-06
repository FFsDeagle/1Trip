import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";


// Interfaces here are slice related and can be used outside of the slice where required
export interface InventoryState {
    status: 'idle' | 'loading' | 'failed' | 'success'
    inventoryItems: InventoryItem[],
    displayedCategory?: InventoryItem[],
}

export const initialState: InventoryState = {
    status: 'idle',
    inventoryItems: [] as InventoryItem[],
    displayedCategory: [] as InventoryItem[],
}

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    category: string,
    quantity: number,
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

export const AddListToInventory = createAsyncThunk(
    'invenotry/addListToInventory',
    async (list: InventoryItem[]) => {
        return list; // This is a placeholder for the actual axios call
        return axios.post('http://localhost:5000/inventory/addListToInventory', { params: ({ list })})
        .then((response: AxiosResponse<InventoryResponse>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when adding list to inventory", error);
            return error;
        })
    }
)

export const GetInventoryItems = createAsyncThunk(
    'invenotry/getInventoryItems',
    async () => {
        return axios.get('http://localhost:5000/inventory/getInventoryItems')
        .then((response: AxiosResponse<InventoryItem[]>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when getting inventory items", error);
            return error;
        })
    }
)

export const inventorySlice = createSlice({
    name: 'invenotry',
    initialState: initialState,
    reducers: {
        GetInventoryItemsByCategory: (state, action: PayloadAction<string>) => {
            state.inventoryItems.forEach((element: InventoryItem) => {
                console.log('element.category:', element.category, ' action.payload:', action.payload);
            });

            state.displayedCategory = state.inventoryItems.filter(
            item => item.category === action.payload
            );

            state.status = 'success';
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
        builder.addCase(AddListToInventory.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(AddListToInventory.fulfilled, (state, action: PayloadAction<InventoryItem[]>) => {
            // As the payload is an array, we need to use the spread operator to correctly add them into the state
            action.payload.forEach((element: InventoryItem) => {
                const foundItem = state.inventoryItems.find((item) => item.id === element.id);
                if (foundItem) {
                    foundItem.quantity += element.quantity;
                }else{
                    state.inventoryItems.push(element);
                }
            });
        })
        builder.addCase(AddListToInventory.rejected, (state) => {
            state.status = 'failed';
        })
    }
})
export const { GetInventoryItemsByCategory } = inventorySlice.actions;
export default inventorySlice.reducer;