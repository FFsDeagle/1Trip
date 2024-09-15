import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";


// Interfaces here are slice related and can be used outside of the slice where required
export interface InventoryState {
    status: 'idle' | 'loading' | 'failed' | 'success'
    items: InventoryItem[],
    favouriteLists: FavouriteList[],
    categories: Categories[],
}

export const initialState: InventoryState = {
    status: 'idle',
    items: [] as InventoryItem[],
    favouriteLists: [] as FavouriteList[],
    categories: [] as Categories[],
}

export interface Categories {
    id?: number,
    name: string,
}

export interface FavouriteList {
    id: string,
    name: string,
    items: InventoryItem[],
}

const testFavList: FavouriteList[] = [
    {
        id: '1',
        name: 'Dairy',
        items: [
            {
                id: '1',
                name: 'Milk',
                description: '1 gallon of whole milk',
                category: 'Dairy',
                defaultExpiry: 7, // 7 days
                uom: 1, // 1 gallon
            },
            {
                id: '2',
                name: 'Cheddar Cheese',
                description: 'Block of aged cheddar cheese',
                category: 'Dairy',
                defaultExpiry: 30, // 30 days
                uom: 1, // 1 block
            }
        ],
    },
    {
        id: '2',
        name: 'Poultry',
        items: [
            {
                id: '3',
                name: 'Chicken Breast',
                description: 'Boneless, skinless chicken breast',
                category: 'Poultry',
                defaultExpiry: 3, // 3 days
                uom: 2, // 2 breasts
            },
            {
                id: '4',
                name: 'Eggs',
                description: 'Carton of a dozen large eggs',
                category: 'Poultry',
                defaultExpiry: 21, // 21 days
                uom: 12, // 12 eggs
            }
        ],
    },
    {
        id: '3',
        name: 'Produce',
        items: [
            {
                id: '5',
                name: 'Lettuce',
                description: 'Fresh romaine lettuce',
                category: 'Produce',
                defaultExpiry: 5, // 5 days
                uom: 1, // 1 head
            },
            {
                id: '6',
                name: 'Apples',
                description: 'Bag of organic Fuji apples',
                category: 'Produce',
                defaultExpiry: 30, // 30 days
                uom: 6, // 6 apples
            }
        ],
    },
    {
        id: '4',
        name: 'Frozen',
        items: [
            {
                id: '7',
                name: 'Frozen Peas',
                description: 'Bag of frozen green peas',
                category: 'Frozen',
                defaultExpiry: 365, // 365 days (1 year)
                uom: 1, // 1 bag
            },
        ],
    },
]

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    category: string,
    uom: number,
    defaultExpiry: number,
}

export interface InventoryResponse {
    status: boolean,
}

export const getProducts = createAsyncThunk(
    'item/getProducts',
    async (id: string) => {
        const response = await axios.get('http://localhost:5000/products/getProducts', { params: { id } })
        return response.data;
    }
)

export const getFavouriteList = createAsyncThunk(
    'item/getFavouriteList',
    async (id: string) => {
        // return testFavList;
        const response = await axios.get('http://localhost:5000/products/getFavouriteList', { params: { id } })
        return response.data;
    }
)

export const addFavouriteList = createAsyncThunk(
    'item/addFavouriteList',
    async ({ name, items }: FavouriteList) => {
        const response = await axios.post('http://localhost:5000/products/addFavouriteList', { name, items })
        return response.data;
    }
)

// Add item to inventory list in database
export const addItem = createAsyncThunk(
    'item/addItem',
    async (product: InventoryItem) => {
        const response = await axios.post('http://localhost:5000/products/addItem', { product })
        return response.data;
    }
)

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (product: InventoryItem) => {
        const response = await axios.post('http://localhost:5000/products/updateItem', { product })
        return response.data;
    }
)

export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async ({ id, userId}: { id: string, userId: string }) => {
        const response = await axios.delete('http://localhost:5000/products/deleteItem', { params: { userId, id } })
        return response.data;
    }
)

export const getCategories = createAsyncThunk(
    'item/getCategories',
    async (id: string) => {
        console.log('test getCategories', id);
        const response = await axios.get('http://192.168.1.116:5000/products/getCategories', { params: { id } });
        return response.data;
    }
)

export const addCategories = createAsyncThunk(
    'item/addCategories',
    async ({id, category}: { id: string, category: Categories}) => {
        const response = await axios.post('http://localhost:5000/products/addCategory', { category })
        return response.data;
    }
)

export const deleteCategories = createAsyncThunk(
    'item/deleteCategories',
    async ({ id }: Categories) => {
        const response = await axios.post('http://localhost:5000/products/deleteCategories', { id })
        return response.data;
    }
)

export const updateCategories = createAsyncThunk(
    'item/updateCategories',
    async ({ id, category }: { id: string, category: Categories}) => {
        const response = await axios.put('http://localhost:5000/products/updateCategories', { id, category })
        return response.data;
    }
)

export const getItemList = createAsyncThunk(
    'item/getItemList',
    async (id: string) => {
        const response = await axios.get('http://192.168.1.116:5000/products/getProducts', { params: { id } })
        return response.data;
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
        builder.addCase(addItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
            state.items.push(action.payload);
        })
        builder.addCase(addItem.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(updateItem.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(updateItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
            state.items = state.items.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            })
        })
        builder.addCase(updateItem.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(deleteItem.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        })
        builder.addCase(deleteItem.rejected, (state) => {
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
        builder.addCase(getFavouriteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getFavouriteList.fulfilled, (state, action) => {
            state.status = 'success';
            state.favouriteLists = action.payload;
        })
        builder.addCase(getFavouriteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(addFavouriteList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addFavouriteList.fulfilled, (state, action) => {
            state.status = 'success';
            state.favouriteLists.push(action.payload);
        })
        builder.addCase(addFavouriteList.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(getCategories.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<Categories[]>) => {
            state.status = 'success';
            state.categories = action.payload;
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(addCategories.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(addCategories.fulfilled, (state, action) => {
            state.status = 'success';
            state.categories.push(action.payload);
        })
        builder.addCase(addCategories.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(deleteCategories.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.status = 'success';
            state.categories = state.categories.filter((category) => category.id !== action.payload);
        })
        builder.addCase(deleteCategories.rejected, (state) => {
            state.status = 'failed';
        })
        builder.addCase(updateCategories.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(updateCategories.fulfilled, (state, action) => {
            state.status = 'success';
            state.categories = state.categories.map((category) => {
                if (category.id === action.payload.id) {
                    return action.payload;
                }
                return category;
            })
        })
        builder.addCase(updateCategories.rejected, (state) => {
            state.status = 'failed';
        })
    }
})

export default inventorySlice.reducer;