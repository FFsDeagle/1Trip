import { NavigationProp } from '@react-navigation/native';
import { FontAwesome6 } from "@expo/vector-icons";
import { ShoppingList } from '@/app/(tabs)/shopping/ShoppingSlice';

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
}

export type ItemsStackParamList = {
    ItemMain: undefined;
    ItemInfo: { searchValue: string };
}

export type ShoppingStackParamList = {
    ShoppingMain: undefined;
    ShoppingItemInfo: { searchValue: string };
    CreateShoppingList: undefined;
    ViewShoppingList: { list: ShoppingList };
    ViewShoppingListType: { list: ViewShoppingListTypeProps };
    StartShopping: { list: ShoppingList };
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
  