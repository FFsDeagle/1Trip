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
        name: 'Milk',
        description: '1 gallon of whole milk',
        category: 'Dairy',
        isFavorite: true,
        defaultExpiry: 7, // 7 days
        uom: 1, // 1 gallon
    },
    {
        id: '2',
        name: 'Cheddar Cheese',
        description: 'Block of aged cheddar cheese',
        category: 'Dairy',
        isFavorite: false,
        defaultExpiry: 30, // 30 days
        uom: 1, // 1 block
    },
    {
        id: '3',
        name: 'Chicken Breast',
        description: 'Boneless, skinless chicken breast',
        category: 'Poultry',
        isFavorite: true,
        defaultExpiry: 3, // 3 days
        uom: 2, // 2 breasts
    },
    {
        id: '4',
        name: 'Eggs',
        description: 'Carton of a dozen large eggs',
        category: 'Poultry',
        isFavorite: false,
        defaultExpiry: 21, // 21 days
        uom: 12, // 12 eggs
    },
    {
        id: '5',
        name: 'Lettuce',
        description: 'Fresh romaine lettuce',
        category: 'Produce',
        isFavorite: false,
        defaultExpiry: 5, // 5 days
        uom: 1, // 1 head
    },
    {
        id: '6',
        name: 'Apples',
        description: 'Bag of organic Fuji apples',
        category: 'Produce',
        isFavorite: true,
        defaultExpiry: 30, // 30 days
        uom: 6, // 6 apples
    },
    {
        id: '7',
        name: 'Frozen Peas',
        description: 'Bag of frozen green peas',
        category: 'Frozen',
        isFavorite: false,
        defaultExpiry: 365, // 365 days (1 year)
        uom: 1, // 1 bag
    },
    {
        id: '8',
        name: 'Ice Cream',
        description: 'Vanilla ice cream, 1 quart',
        category: 'Frozen',
        isFavorite: true,
        defaultExpiry: 180, // 180 days (6 months)
        uom: 1, // 1 quart
    },
    {
        id: '9',
        name: 'Orange Juice',
        description: '64 oz bottle of orange juice',
        category: 'Beverages',
        isFavorite: false,
        defaultExpiry: 10, // 10 days
        uom: 1, // 1 bottle
    },
    {
        id: '10',
        name: 'Coca-Cola',
        description: '12-pack of Coca-Cola cans',
        category: 'Beverages',
        isFavorite: true,
        defaultExpiry: 365, // 365 days (1 year)
        uom: 12, // 12 cans
    },
    {
        id: '11',
        name: 'Canned Tomatoes',
        description: 'Can of diced tomatoes',
        category: 'Canned',
        isFavorite: false,
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 can
    },
    {
        id: '12',
        name: 'Canned Beans',
        description: 'Can of black beans',
        category: 'Canned',
        isFavorite: false,
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 can
    },
    {
        id: '13',
        name: 'Bread',
        description: 'Loaf of whole wheat bread',
        category: 'Bakery',
        isFavorite: true,
        defaultExpiry: 7, // 7 days
        uom: 1, // 1 loaf
    },
    {
        id: '14',
        name: 'Muffins',
        description: 'Pack of blueberry muffins',
        category: 'Bakery',
        isFavorite: false,
        defaultExpiry: 5, // 5 days
        uom: 4, // 4 muffins
    },
    {
        id: '15',
        name: 'Pasta',
        description: 'Box of spaghetti pasta',
        category: 'Pantry',
        isFavorite: false,
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 box
    },
    {
        id: '16',
        name: 'Rice',
        description: '5 lb bag of jasmine rice',
        category: 'Pantry',
        isFavorite: true,
        defaultExpiry: 1095, // 1095 days (3 years)
        uom: 1, // 1 bag
    },
    {
        id: '17',
        name: 'Chips',
        description: 'Bag of potato chips',
        category: 'Snacks',
        isFavorite: false,
        defaultExpiry: 60, // 60 days (2 months)
        uom: 1, // 1 bag
    },
    {
        id: '18',
        name: 'Chocolate Bar',
        description: 'Dark chocolate bar, 70% cocoa',
        category: 'Snacks',
        isFavorite: true,
        defaultExpiry: 365, // 365 days (1 year)
        uom: 1, // 1 bar
    },
    {
        id: '19',
        name: 'Paper Towels',
        description: '6-pack of paper towels',
        category: 'Household',
        isFavorite: false,
        defaultExpiry: 0, // No expiry
        uom: 6, // 6 rolls
    },
    {
        id: '20',
        name: 'Laundry Detergent',
        description: 'Bottle of liquid laundry detergent',
        category: 'Household',
        isFavorite: false,
        defaultExpiry: 0, // No expiry
        uom: 1, // 1 bottle
    },
    {
        id: '21',
        name: 'Shampoo',
        description: 'Bottle of moisturizing shampoo',
        category: 'Personal Care',
        isFavorite: false,
        defaultExpiry: 365, // 365 days (1 year)
        uom: 1, // 1 bottle
    },
    {
        id: '22',
        name: 'Toothpaste',
        description: 'Tube of whitening toothpaste',
        category: 'Personal Care',
        isFavorite: true,
        defaultExpiry: 730, // 730 days (2 years)
        uom: 1, // 1 tube
    },
    {
        id: '23',
        name: 'Batteries',
        description: 'Pack of AA batteries',
        category: 'Misc',
        isFavorite: false,
        defaultExpiry: 3650, // 3650 days (10 years)
        uom: 4, // 4 batteries
    },
    {
        id: '24',
        name: 'Light Bulbs',
        description: '4-pack of LED light bulbs',
        category: 'Misc',
        isFavorite: false,
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
    isFavorite: boolean,
    defaultExpiry: number,
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