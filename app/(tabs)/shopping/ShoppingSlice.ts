import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { useAppDispatch } from "@/app/store/hooks";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";
import { RootState } from "@/app/store/store";
import { Categories } from "../items/ItemSlice";

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
    _id?: string,
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
        const response = await axios.delete(`http://192.168.1.112:5000/shopping/deleteList`, {
            data: { id, list },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
);

export const DeleteIncompleteList = createAsyncThunk(
    'shoppingList/deleteIncompleteList',
    async ({ id, list }: { id: string, list: ShoppingList}, { getState }) => {
        const state = getState() as RootState;
        const { token } = state.login.loginResponse;
        const response = await axios.delete('http://192.168.1.112:5000/shopping/deleteIncompleteList', {
            data: { id, list },
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
        const response = await axios.post('http://192.168.1.112:5000/shopping/saveIncompleteList', { id, list }, {
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
        const response = await axios.get('http://192.168.1.112:5000/shopping/getLists', {
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
        const response = await axios.post('http://192.168.1.112:5000/shopping/updateList', { id, list }, {
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
        console.log('testSave NEW');
        console.log(id);
        console.log(list);
        console.log('saveList token', token);
        const response = await axios.post('http://192.168.1.112:5000/shopping/saveList', { id, list }, {
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
        const response = await axios.post('http://192.168.1.112:5000/shopping/saveToHistory', { id, list }, {
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
        updateShoppingListCategory(state, action: PayloadAction<{ deletedCategory: Categories, newCategory: string }>) {
            const { deletedCategory, newCategory } = action.payload;
            console.log('updateShoppingListCategory action:', deletedCategory, newCategory);
            // Update the shopping list items that belong to the deleted category
            state.lists.savedLists = state.lists.savedLists.map(list => ({
                ...list,
                items: list.items.map(item => 
                    item.category === deletedCategory.name
                        ? { ...item, category: newCategory }
                        : item
                )
            }));
            state.lists.incompleteLists = state.lists.incompleteLists.map(list => ({
                ...list,
                items: list.items.map(item => 
                    item.category === deletedCategory.name
                        ? { ...item, category: newCategory }
                        : item
                )
            }));
        },
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
            state.lists = action.payload;
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
        builder.addCase(SaveIncompleteList.fulfilled, (state, action) => {
            state.status = 'success';
            state.lists = action.payload;
        })
        builder.addCase(SaveIncompleteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(DeleteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(DeleteList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            console.log('deleteList action:', action.payload._id);
            state.lists.savedLists = state.lists.savedLists.filter(list => list._id !== action.payload._id);
        })
        builder.addCase(DeleteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(DeleteIncompleteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(DeleteIncompleteList.fulfilled, (state, action: PayloadAction<ShoppingList>) => {
            state.status = 'success';
            console.log('deleteIncompleteList action:', action.payload._id);
            state.lists.incompleteLists = state.lists.incompleteLists.filter(list => list._id !== action.payload._id);
        })
        builder.addCase(DeleteIncompleteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(SaveToHistory.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(SaveToHistory.fulfilled, (state, action) => {
            console.log('saveToHistory action:', action.payload);
            state.lists = action.payload;
        })
        builder.addCase(SaveToHistory.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export const { updateShoppingListCategory } = ShoppingListSlice.actions;

export default ShoppingListSlice.reducer;