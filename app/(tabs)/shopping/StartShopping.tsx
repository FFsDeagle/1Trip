import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { ScrollView, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import MultiButtonContextMenu from "@/components/widgets/misc/MultiButtonContextMenu";
import { ShoppingStackParamList } from "@/constants/types";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";
import { useState } from "react";
import { DeleteIncompleteList, SaveIncompleteList, SaveToHistory, ShoppingList } from "./ShoppingSlice";

type ViewShoppingListProps = {
    route: RouteProp<ShoppingStackParamList, 'StartShopping'>;
};

export default function StartShopping({ route }: ViewShoppingListProps){
    const { list, name, listType } = route.params;
    const theme = useAppSelector(state => state.theme.colors);
    const items = useAppSelector(state => state.inventory.inventoryItems);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const dispatch = useAppDispatch();
    const [shoppingList, setShoppingList] = useState<InventoryItem[]>(list);
    const [checkedList, setCheckedList] = useState<InventoryItem[]>([]);
    const { id } = useAppSelector(state => state.login.loginResponse);

    const handleSubmit = () => {
        // Get unchecked items and save into incompleteLists
        const remainingItems: ShoppingList = {
            name: name,
            items: shoppingList.filter(item => checkedList.map(checkedItem => item.id !== checkedItem.id))
        }
        if (remainingItems && remainingItems.items.length > 0){
            dispatch(SaveIncompleteList({id, list: remainingItems}));
        }
        dispatch(AddListToInventory(checkedList as InventoryItem[]));
        const mutatedList: ShoppingList = {
            items: checkedList as InventoryItem[],
            name: name,
        }
        if (listType === "incompleteLists"){
            dispatch(DeleteIncompleteList({ id, list: mutatedList }));
        }
        dispatch(SaveToHistory({id, list: mutatedList}));
        navigation.navigate('ShoppingMain');
    }

    const decrementItem = (id: string | number) => {
        setShoppingList(shoppingList.map((item) => {
            if (item.id === id) {
                // filter item if quantity is 0
                if (item.quantity === 1) {
                    return null;
                }
                item.quantity -= 1;
            }
            return item;
        }).filter(Boolean) as InventoryItem[]);
    }

    const incrementItem = (id: string | number) => {
        setShoppingList([...shoppingList.map((x) => {
            if (x.id === id) {
                x.quantity += 1;
            }
            return x;
        })])
    }

    const checkItem = (id: string | number) => {
        // Check item and move to a different list
        setCheckedList([...checkedList, ...shoppingList.filter(item => item.id === id)]);
        setShoppingList([...shoppingList.filter(item => item.id !== id)]);
    }

    const uncheckItem = (id: string | number) => {
        const item = checkedList.filter(item => item.id === id);
        setCheckedList([...checkedList.filter(item => item.id !== id)]);
        setShoppingList([...shoppingList, ...item]);
    }

    const renderItem = (item: InventoryItem[], isChecked: boolean) => {
        return item.map(item => (
            <View key={item.id} style={[styles.flexRow, { padding: 5, backgroundColor: 'transparent' }]}>
                <View style={[styles.flexRow, { backgroundColor: isChecked ? 'lightgreen' : theme.background3, marginLeft: 5, borderRadius: 15, width: 'auto', padding: 5, elevation: 1 }]}>
                    <View style={[styles.flexRow, styles.justifiedApart, { width: '65%'}]}>
                        <TextPrimary style={[styles.listText, { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }]}>{item.name}</TextPrimary>
                        <TextPrimary style={[styles.listText, { fontSize: 12 }]}>{item.category}</TextPrimary>
                    </View>
                    <View style={[styles.flexRow, styles.justfiedEnd, { width: '35%' }]}>
                        <TextPrimary style={[styles.listText, { marginRight: 10 }]}>{item.quantity}</TextPrimary>
                        {!isChecked && <TouchableOpacity onPress={() => decrementItem(item.id)} style={[styles.justified, { marginRight: 10 }]}>
                            <FontAwesome name="minus" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>}
                        {!isChecked && <TouchableOpacity onPress={() => incrementItem(item.id)} style={[styles.justified, { marginRight: 20 }]}>
                            <FontAwesome name="plus" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>}
                        <TouchableOpacity onPress={() => isChecked ? uncheckItem(item.id) : checkItem(item.id) } style={[styles.justified, { marginRight: 20 }]}>
                            <FontAwesome name={isChecked ? 'times-circle' : "check-square"} size={20} color={theme.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ))
    }

    return (
        <SecondaryView>
            <ScrollView style={styles.container}>
                {shoppingList.length > 0 && renderItem(shoppingList, false)}
                {checkedList.length > 0 && renderItem(checkedList, true)}
            </ScrollView>
            <MultiButtonContextMenu 
                // Add buttons to the context menu
                buttons={[
                    <TouchableOpacity 
                        onPress={handleSubmit}
                    >
                        <FontAwesome5 name="cash-register" size={24} color={theme.iconColor} />
                    </TouchableOpacity>
                ]} 
            />
        </SecondaryView>
    )
}