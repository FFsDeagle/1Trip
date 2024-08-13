import { PrimaryView, SecondaryView, TextPrimary } from "@/components/Themed";
import { TouchableOpacity } from 'react-native';
import { InventoryItem } from "../../inventory/InventorySlice";
import { View } from "react-native";
import { styles } from "@/components/util/Theme";
import { useAppSelector } from "@/app/store/hooks";
import { FontAwesome } from "@expo/vector-icons";

type RenderFavoriteItemsProps = {
    shoppingList: InventoryItem[];
    setShoppingList: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
}

export default function RenderShoppingListItems({ setShoppingList, shoppingList }: RenderFavoriteItemsProps) {
    const theme = useAppSelector(state => state.theme.colors);

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

    return (
        shoppingList.map((item, key) => {
            return (
                <View key={key} style={[styles.flexRow, { padding: 5, backgroundColor: 'transparent' }]}>
                    <View style={[styles.flexRow, { backgroundColor: theme.background3, marginLeft: 5, borderRadius: 15, width: 'auto', padding: 5, elevation: 1 }]}>
                        <View style={[styles.flexRow, styles.justifiedApart, { width: '65%'}]}>
                            <TextPrimary style={[styles.listText, { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }]}>{item.name}</TextPrimary>
                            <TextPrimary style={[styles.listText, { fontSize: 12 }]}>{item.category}</TextPrimary>
                        </View>
                        <View style={[styles.flexRow, styles.justfiedEnd, { width: '35%' }]}>
                            <TextPrimary style={[styles.listText, { marginRight: 10 }]}>{item.quantity}</TextPrimary>
                            <TouchableOpacity onPress={() => setShoppingList([...shoppingList.filter((x) => x.id !== item.id)])} style={[styles.justified, { marginRight: 10 }]}>
                                <FontAwesome name="trash" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => decrementItem(item.id)} style={[styles.justified, { marginRight: 10 }]}>
                                <FontAwesome name="minus" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setShoppingList([...shoppingList.map((x) => {
                                if (x.id === item.id) {
                                    x.quantity += 1;
                                }
                                return x;
                            })])} style={[styles.justified, { marginRight: 20 }]}>
                                <FontAwesome name="plus" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        })
    )
}