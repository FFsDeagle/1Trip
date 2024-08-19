import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "@/app/store/hooks";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";

export interface ShoppingListProps {
    status: 'idle' | 'loading' | 'failed' | 'success',
    lists: ShoppingListTypes,
}

export interface ShoppingListTypes {
    savedLists: ShoppingList[],
    incompleteLists: ShoppingList[],
    generatedLists: ShoppingList[],
    history: ShoppingList[],
}

export interface ShoppingList {
    id?: string,
    name: string,
    items: InventoryItem[]
}

export const initialState: ShoppingListProps = {
    status: 'idle',
    lists: {
        savedLists: [] as ShoppingList[],
        incompleteLists: [] as ShoppingList[],
        generatedLists: [] as ShoppingList[],
        history: [] as ShoppingList[],
    }
}

const emptyLists: ShoppingListTypes = {
    savedLists: [] as ShoppingList[],
    incompleteLists: [] as ShoppingList[],
    generatedLists: [] as ShoppingList[],
    history: [] as ShoppingList[],
}

export const DeleteList = createAsyncThunk(
    'shoppingList/deleteList',
    async (list: ShoppingList) => {
        return list; // This is a placeholder for the actual axios call
        return axios.post('http://localhost:5000/shopping/deleteList', list)
        .then((response: AxiosResponse) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when deleting list", error);
            return error;
        })
    }
)

export const SaveIncompleteList = createAsyncThunk(
    'shoppingList/saveIncompleteList',
    async (list: ShoppingList) => {
        return list; // This is a placeholder for the actual axios call
        return axios.post('http://localhost:5000/shopping/saveIncompleteList', list)
        .then((response: AxiosResponse) => {
            return response;
        }).catch((error) => {
            console.log("Error occurred when saving incomplete list", error);
            return error;
        })
    }
)

export const GetLists = createAsyncThunk(
    'shoppingList/getLists',
    async () => {
        return emptyLists as unknown as AxiosResponse<ShoppingListTypes>; // This is a placeholder for the actual axios call
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
        builder.addCase(SaveShoppingList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            state.lists.savedLists.push(action.payload);
            state.lists.history.push(action.payload);
        })
        builder.addCase(SaveShoppingList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(SaveIncompleteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(SaveIncompleteList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            state.lists.incompleteLists.push(action.payload);
        })
        builder.addCase(SaveIncompleteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(DeleteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(DeleteList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            state.lists.savedLists = state.lists.savedLists.filter(list => list.id !== action.payload.id);
        })
        builder.addCase(DeleteList.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default ShoppingListSlice.reducer;