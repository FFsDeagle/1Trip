import { ScrollView, SecondaryView } from "@/components/Themed";
import RenderShoppingLists from "./RenderShoppingLists";
import { ShoppingListTypes } from "./ShoppingSlice";
import { useEffect } from "react";
import { useNavigation } from "expo-router";
import { ShoppingStackParamList } from "@/constants/types";
import { NavigationProp, RouteProp } from "@react-navigation/native";

  
type ViewShoppingListProps = {
    route: RouteProp<ShoppingStackParamList, "ViewShoppingListType">;
};

export default function ViewShoppingListType({ route }: ViewShoppingListProps) {
    const { list } = route.params;
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();

    useEffect(() => {
        navigation.setOptions({
            title: list.title
        })
    },[navigation]);

    return (
        <SecondaryView>
            <RenderShoppingLists title={list.title} listType={list.listType as keyof ShoppingListTypes} />
        </SecondaryView>
    )
}