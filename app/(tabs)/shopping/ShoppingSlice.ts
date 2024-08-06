import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "@/app/store/hooks";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";

export interface ShoppingListProps {
    status: 'idle' | 'loading' | 'failed' | 'success',
    lists?: ShoppingListTypes,
}

export interface ShoppingListTypes {
    savedLists?: ShoppingList[],
    generatedLists?: ShoppingList[],
    history?: ShoppingList[],
}

export interface ShoppingList {
    id: string,
    name: string,
    items?: InventoryItem[]
}

export const placeHolderList: ShoppingListTypes = {
    savedLists: [
        {
            id: '1',
            name: 'Saved List 1',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    quantity: 1,
                    description: 'Description 1',
                    category: 'Miscellaneous',
                },
                {
                    id: '2',
                    name: 'Item 2',
                    quantity: 2,
                    description: 'Description 2',
                    category: 'Miscellaneous',
                },
            ]
        },
        {
            id: '2',
            name: 'Saved List 2',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    quantity: 1,
                    description: 'Description 1',
                    category: 'Miscellaneous',
                },
                {
                    id: '2',
                    name: 'Item 2',
                    quantity: 2,
                    description: 'Description 2',
                    category: 'Miscellaneous',
                },
            ]
        },
    ],
    generatedLists: [
        {
            id: '1',
            name: 'Generated List 1',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    quantity: 1,
                    description: 'Description 1',
                    category: 'Miscellaneous',
                },
                {
                    id: '2',
                    name: 'Item 2',
                    quantity: 2,
                    description: 'Description 2',
                    category: 'Miscellaneous',
                },
            ]
        },
        {
            id: '2',
            name: 'Generated List 2',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    quantity: 1,
                    description: 'Description 1',
                    category: 'Miscellaneous',
                },
                {
                    id: '2',
                    name: 'Item 2',
                    quantity: 2,
                    description: 'Description 2',
                    category: 'Miscellaneous',
                },
            ]
        },
    ],
    history: [
        {
            id: '1',
            name: 'History List 1',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    quantity: 1,
                    description: 'Description 1',
                    category: 'Miscellaneous',
                },
                {
                    id: '2',
                    name: 'Item 2',
                    quantity: 2,
                    description: 'Description 2',
                    category: 'Miscellaneous',
                },
            ]
        },
        {
            id: '2',
            name: 'History List 2',
            items: [
                {
                    id: '1',
                    name: 'Item 1',
                    quantity: 1,
                    description: 'Description 1',
                    category: 'Miscellaneous',
                },
                {
                    id: '2',
                    name: 'Item 2',
                    quantity: 2,
                    description: 'Description 2',
                    category: 'Miscellaneous',
                },
            ]
        },
    ],
}

export const initialState: ShoppingListProps = {
    status: 'idle',
    lists: {
        savedLists: [] as ShoppingList[],
        generatedLists: [] as ShoppingList[],
        history: [] as ShoppingList[],
    }
}

export const GetLists = createAsyncThunk(
    'shoppingList/getLists',
    async () => {
        return placeHolderList as AxiosResponse<ShoppingListTypes>; // This is a placeholder for the actual axios call
        return axios.get('http://localhost:5000/shopping/getLists')
        .then((response: AxiosResponse<ShoppingListTypes>) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when getting lists", error);
            return error;
        })
    }
)

export const SaveShoppingList = createAsyncThunk(
    'shoppingList/saveList',
    async (list: ShoppingList) => {
        return list; // This is a placeholder for the actual axios call
        return axios.post('http://localhost:5000/shopping/saveList', list)
        .then((response: AxiosResponse) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when saving list", error);
            return error;
        })
    }
)

export const ShoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(GetLists.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(GetLists.fulfilled, (state, action) => {
            state.status = 'success';
            state.lists = action.payload;
        })
        builder.addCase(GetLists.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(SaveShoppingList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(SaveShoppingList.fulfilled, (state, action) => {
            state.status = 'success';
            state.lists?.savedLists?.push(action.payload);
        })
        builder.addCase(SaveShoppingList.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default ShoppingListSlice.reducer;