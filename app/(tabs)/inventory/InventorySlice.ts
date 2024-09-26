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
    _id: string,
    name: string,
    description: string,
    category: string,
    quantity: number,
    lastAddedDate: string,
    isPastExpiry: boolean,
}

export interface InventoryResponse {
    status: boolean,
}

// Add item to inventory list in database
export const addItem = createAsyncThunk(
    'inventory/addInventory',
    async ({ category, description, name }: InventoryItem, { getState }) => {
        const state = getState() as { auth: { token: string } };
        const token = state.auth.token;
        const response = await axios.post(
            'http://192.168.1.116:5000/inventory/addInventory',
            { category, description, name },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }
);

export const AddListToInventory = createAsyncThunk(
    'inventory/addListToInventory',
    async (list: InventoryItem[], { getState }) => {
        const state = getState() as { auth: { token: string } };
        const token = state.auth.token;
        const response = await axios.post(
            'http://192.168.1.116:5000/inventory/addListToInventory',
            { list },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }
);

export const GetInventoryItems = createAsyncThunk(
    'inventory/getInventory',
    async (_, { getState }) => {
        const state = getState() as { auth: { token: string } };
        const token = state.auth.token;
        const response = await axios.get(
            'http://192.168.1.116:5000/inventory/getInventoryItems',
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    }
);

export const inventorySlice = createSlice({
    name: 'inventory',
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
        builder.addCase(AddListToInventory.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(AddListToInventory.fulfilled, (state, action: PayloadAction<InventoryItem[]>) => {
            // As the payload is an array, we need to use the spread operator to correctly add them into the state
            action.payload.forEach((element: InventoryItem) => {
                const foundItem = state.inventoryItems.find((item) => item._id === element._id);
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