import { NavigationProp } from '@react-navigation/native';
import { FontAwesome6 } from "@expo/vector-icons";
import { ShoppingList } from '@/app/(tabs)/shopping/ShoppingSlice';
import { InventoryItem } from '@/app/(tabs)/inventory/InventorySlice';

export type RootFontList = {
    Fontawesome6: typeof FontAwesome6
}

export interface LoginProps {
    userName: string,
    password: string,
}

export interface WidgetGridItemProps {
    component: React.ElementType,
    title: string,
    icon: string,
    size: number,
}

export interface SearchBarProp {
    componentToRender: string,
    inputValue?: string
}

export interface MappingProps {
    modal: string,
    title: string,
    subComponent: string
    navigation: NavigationProp<ReactNavigation.RootParamList>
}

export interface NavigationProps {
    navigation: NavigationProp<ReactNavigation.RootParamList>
}

export type InventoryStackParamList = {
    InventoryMain: undefined;
    InventoryItemInfo: { searchValue: string };
    AddItem: undefined;
    ItemSearch: ItemSearchProps;
}

export type ItemsStackParamList = {
    ItemMain: undefined;
    AddNewProduct: undefined;
    AddNewCategory: undefined;
    AddProduct: undefined;
    ItemInfo: { searchValue: string };
    ProductSearch: ProductSearchProps;
}

export type ItemSearchProps = { placeholder: string, nav: keyof InventoryStackParamList }
export type ProductSearchProps = { placeholder: string, nav: keyof ItemsStackParamList }

export type ShoppingStackParamList = {
    ShoppingMain: undefined;
    ShoppingItemInfo: { searchValue: string };
    CreateShoppingList: { name: string, list: ShoppingList, listType: string };
    ViewShoppingList: { name: string, list: ShoppingList, listType: string };
    ViewShoppingListType: { list: ViewShoppingListTypeProps };
    StartShopping: { name: string, list: InventoryItem[], listType: string };
    ViewHistoryList: { name: string, list: ShoppingList, listType: string };
    Settings: undefined;
}

export type ViewShoppingListTypeProps = {
    listType: string;
    title: string;
}

export type RootStackParamList = {
    Login: undefined,
    Inventory: undefined,
    Shopping: undefined,
  };
  