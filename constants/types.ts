import { NavigationProp } from '@react-navigation/native';

export interface LoginProps {
    userName: string,
    password: string,
}

export interface WidgetGridItemProps {
    component: React.ElementType,
    title: string,
    icon: string,
    size: number,
    iconColor: string,
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

export type ShoppingStackParamList = {

}