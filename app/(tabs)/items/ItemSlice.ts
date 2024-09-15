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

const testCategories: Categories[] = [
    { id: 1, name: 'Dairy' },
    { id: 2, name: 'Poultry' },
    { id: 3, name: 'Produce' },
    { id: 4, name: 'Frozen' },
    { id: 5, name: 'Beverages' },
    { id: 6, name: 'Canned' },
    { id: 7, name: 'Bakery' },
    { id: 8, name: 'Pantry' },
    { id: 9, name: 'Snacks' },
    { id: 10, name: 'Household' },
    { id: 11, name: 'Personal Care' },
    { id: 12, name: 'Misc' },
];

const testState: InventoryItem[] = [
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
    },
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
    },
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
    },
    {
        id: '7',
        name: 'Frozen Peas',
        description: 'Bag of frozen green peas',
        category: 'Frozen',
        defaultExpiry: 365, // 365 days (1 year)
        uom: 1, // 1 bag
    },
    {
        id: '8',
        name: 'Ice Cream',
        description: 'Vanilla ice cream, 1 quart',
        category: 'Frozen',
        defaultExpiry: 180, // 180 days (6 months)
        uom: 1, // 1 quart
    },
    {
        id: '9',
        name: 'Orange Juice',
        description: '64 oz bottle of orange juice',
        category: 'Beverages',
        defaultExpiry: 10, // 10 days
        uom: 1, // 1 bottle
    },
    {
        id: '10',
        name: 'Coca-Cola',
        description: '12-pack of Coca-Cola cans',
        category: 'Beverages',
        defaultExpiry: 365, // 365 days (1 year)
        uom: 12, // 12 cans
    },
    {
        id: '11',
        name: 'Canned Tomatoes',
        description: 'Can of diced tomatoes',
        category: 'Canned',
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 can
    },
    {
        id: '12',
        name: 'Canned Beans',
        description: 'Can of black beans',
        category: 'Canned',
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 can
    },
    {
        id: '13',
        name: 'Bread',
        description: 'Loaf of whole wheat bread',
        category: 'Bakery',
        defaultExpiry: 7, // 7 days
        uom: 1, // 1 loaf
    },
    {
        id: '14',
        name: 'Muffins',
        description: 'Pack of blueberry muffins',
        category: 'Bakery',
        defaultExpiry: 5, // 5 days
        uom: 4, // 4 muffins
    },
    {
        id: '15',
        name: 'Pasta',
        description: 'Box of spaghetti pasta',
        category: 'Pantry',
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 box
    },
    {
        id: '16',
        name: 'Rice',
        description: '5 lb bag of jasmine rice',
        category: 'Pantry',
        defaultExpiry: 1095, // 1095 days (3 years)
        uom: 1, // 1 bag
    },
    {
        id: '17',
        name: 'Chips',
        description: 'Bag of potato chips',
        category: 'Snacks',
        defaultExpiry: 60, // 60 days (2 months)
        uom: 1, // 1 bag
    },
    {
        id: '18',
        name: 'Chocolate Bar',
        description: 'Dark chocolate bar, 70% cocoa',
        category: 'Snacks',
        defaultExpiry: 365, // 365 days (1 year)
        uom: 1, // 1 bar
    },
    {
        id: '19',
        name: 'Paper Towels',
        description: '6-pack of paper towels',
        category: 'Household',
        defaultExpiry: 0, // No expiry
        uom: 6, // 6 rolls
    },
    {
        id: '20',
        name: 'Laundry Detergent',
        description: 'Bottle of liquid laundry detergent',
        category: 'Household',
        defaultExpiry: 0, // No expiry
        uom: 1, // 1 bottle
    },
    {
        id: '21',
        name: 'Shampoo',
        description: 'Bottle of moisturizing shampoo',
        category: 'Personal Care',
        defaultExpiry: 365, // 365 days (1 year)
        uom: 1, // 1 bottle
    },
    {
        id: '22',
        name: 'Toothpaste',
        description: 'Tube of whitening toothpaste',
        category: 'Personal Care',
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 tube
    },
    {
        id: '23',
        name: 'Batteries',
        description: 'Pack of AA batteries',
        category: 'Misc',
        defaultExpiry: 3650, // 3650 days (10 years)
        uom: 4, // 4 batteries
    },
    {
        id: '24',
        name: 'Light Bulbs',
        description: '4-pack of LED light bulbs',
        category: 'Misc',
        defaultExpiry: 3650, // 3650 days (10 years)
        uom: 4, // 4 bulbs
    },
];

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