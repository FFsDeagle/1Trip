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
    },
    {
        id: '2',
        name: 'Cheddar Cheese',
        description: 'Block of aged cheddar cheese',
        category: 'Dairy',
        isFavorite: false,
    },
    {
        id: '3',
        name: 'Chicken Breast',
        description: 'Boneless, skinless chicken breast',
        category: 'Poultry',
        isFavorite: true,
    },
    {
        id: '4',
        name: 'Eggs',
        description: 'Carton of a dozen large eggs',
        category: 'Poultry',
        isFavorite: false,
    },
    {
        id: '5',
        name: 'Lettuce',
        description: 'Fresh romaine lettuce',
        category: 'Produce',
        isFavorite: false,
    },
    {
        id: '6',
        name: 'Apples',
        description: 'Bag of organic Fuji apples',
        category: 'Produce',
        isFavorite: true,
    },
    {
        id: '7',
        name: 'Frozen Peas',
        description: 'Bag of frozen green peas',
        category: 'Frozen',
        isFavorite: false,
    },
    {
        id: '8',
        name: 'Ice Cream',
        description: 'Vanilla ice cream, 1 quart',
        category: 'Frozen',
        isFavorite: true,
    },
    {
        id: '9',
        name: 'Orange Juice',
        description: '64 oz bottle of orange juice',
        category: 'Beverages',
        isFavorite: false,
    },
    {
        id: '10',
        name: 'Coca-Cola',
        description: '12-pack of Coca-Cola cans',
        category: 'Beverages',
        isFavorite: true,
    },
    {
        id: '11',
        name: 'Canned Tomatoes',
        description: 'Can of diced tomatoes',
        category: 'Canned',
        isFavorite: false,
    },
    {
        id: '12',
        name: 'Canned Beans',
        description: 'Can of black beans',
        category: 'Canned',
        isFavorite: false,
    },
    {
        id: '13',
        name: 'Bread',
        description: 'Loaf of whole wheat bread',
        category: 'Bakery',
        isFavorite: true,
    },
    {
        id: '14',
        name: 'Muffins',
        description: 'Pack of blueberry muffins',
        category: 'Bakery',
        isFavorite: false,
    },
    {
        id: '15',
        name: 'Pasta',
        description: 'Box of spaghetti pasta',
        category: 'Pantry',
        isFavorite: false,
    },
    {
        id: '16',
        name: 'Rice',
        description: '5 lb bag of jasmine rice',
        category: 'Pantry',
        isFavorite: true,
    },
    {
        id: '17',
        name: 'Chips',
        description: 'Bag of potato chips',
        category: 'Snacks',
        isFavorite: false,
    },
    {
        id: '18',
        name: 'Chocolate Bar',
        description: 'Dark chocolate bar, 70% cocoa',
        category: 'Snacks',
        isFavorite: true,
    },
    {
        id: '19',
        name: 'Paper Towels',
        description: '6-pack of paper towels',
        category: 'Household',
        isFavorite: false,
    },
    {
        id: '20',
        name: 'Laundry Detergent',
        description: 'Bottle of liquid laundry detergent',
        category: 'Household',
        isFavorite: false,
    },
    {
        id: '21',
        name: 'Shampoo',
        description: 'Bottle of moisturizing shampoo',
        category: 'Personal Care',
        isFavorite: false,
    },
    {
        id: '22',
        name: 'Toothpaste',
        description: 'Tube of whitening toothpaste',
        category: 'Personal Care',
        isFavorite: true,
    },
    {
        id: '23',
        name: 'Batteries',
        description: 'Pack of AA batteries',
        category: 'Misc',
        isFavorite: false,
    },
    {
        id: '24',
        name: 'Light Bulbs',
        description: '4-pack of LED light bulbs',
        category: 'Misc',
        isFavorite: false,
    },
];


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