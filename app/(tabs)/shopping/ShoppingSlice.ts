import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "@/app/store/hooks";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";
import { RootState } from "@/app/store/store";

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
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.post('http://192.168.1.116:5000/shopping/deleteList', { id, list }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)

export const DeleteIncompleteList = createAsyncThunk(
    'shoppingList/deleteIncompleteList',
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.post('http://192.168.1.116:5000/shopping/deleteList', { id, list }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)

export const SaveIncompleteList = createAsyncThunk(
    'shoppingList/saveIncompleteList',
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.post('http://192.168.1.116:5000/shopping/saveIncompleteList', { id, list }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)

export const GetLists = createAsyncThunk(
    'shoppingList/getLists',
    async (id: string, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.get('http://192.168.1.116:5000/shopping/getLists', {
            params: { id },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)

export const UpdateShoppingList = createAsyncThunk(
    'shoppingList/updateList',
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.post('http://192.168.1.116:5000/shopping/updateList', { id, list }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)

export const SaveShoppingList = createAsyncThunk(
    'shoppingList/saveList',
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        console.log('testSave');
        console.log(id);
        console.log(list);
        console.log('saveList token', token);
        const response = await axios.post('http://192.168.1.116:5000/shopping/saveList', { id, list }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
)

export const SaveToHistory = createAsyncThunk(
    'shoppingList/saveToHistory',
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.post('http://192.168.1.116:5000/shopping/saveToHistory', { id, list }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
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
        })
        builder.addCase(SaveShoppingList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(UpdateShoppingList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(UpdateShoppingList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            state.lists.savedLists = state.lists.savedLists.map(list => list.name === action.payload.name ? action.payload : list);
        })
        builder.addCase(UpdateShoppingList.rejected, (state) => {
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
            // For now we will remove the list by name as ID is to be generated by the server
            state.lists.savedLists = state.lists.savedLists.filter(list => list.name !== action.payload.name);
            //state.lists.savedLists = state.lists.savedLists.filter(list => list.id !== action.payload.id);
        })
        builder.addCase(DeleteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(DeleteIncompleteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(DeleteIncompleteList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            // For now we will remove the list by name as ID is to be generated by the server
            state.lists.incompleteLists = state.lists.incompleteLists.filter(list => list.name !== action.payload.name);
            //state.lists.savedLists = state.lists.savedLists.filter(list => list.id !== action.payload.id);
        })
        builder.addCase(DeleteIncompleteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(SaveToHistory.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(SaveToHistory.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.lists.history.push(action.payload);
        })
        builder.addCase(SaveToHistory.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default ShoppingListSlice.reducer;