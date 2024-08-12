import { PrimaryView, SecondaryView, TextPrimary } from "@/components/Themed";
import { TouchableOpacity } from 'react-native';
import { InventoryItem } from "../../items/ItemSlice";
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
        setShoppingList(shoppingList.filter(item => item.id !== id));
    }

    return (
        shoppingList.map((item, key) => {
            return (
                <SecondaryView key={key} style={[styles.listItem]}>
                    <View style={[styles.flexRow, styles.justifiedApart, { width: '80%' }]}>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextPrimary style={[styles.listText]}>{item.name}</TextPrimary>
                            <TextPrimary style={[styles.listText, { borderColor: theme.textSecondary, borderLeftWidth: 1, marginLeft: 20, paddingLeft: 30 }]}>{item.category}</TextPrimary>
                        </View>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextPrimary style={[styles.listText]}>1</TextPrimary>
                            <TouchableOpacity onPress={() => decrementItem(item.id)} style={[{ backgroundColor: theme.primary, marginLeft: 20 }]}>
                                <FontAwesome name="minus" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </SecondaryView>
            )
        })
    )
}