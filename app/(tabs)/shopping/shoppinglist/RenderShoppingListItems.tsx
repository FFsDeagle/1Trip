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
        setShoppingList((prevList) =>
          prevList
            .map((item) => {
              if (item._id === id) {
                if (item.quantity > 1) {
                  return { ...item, quantity: item.quantity - 1 }; // Create a new object with updated quantity
                } else {
                  return null; // Return null if quantity is 1 (we'll filter it out)
                }
              }
              return item;
            })
            .filter(Boolean) as InventoryItem[] // Filter out null values
        );
      };
      
      const incrementItem = (id: string | number) => {
        setShoppingList((prevList) =>
          prevList.map((item) => {
            if (item._id === id) {
              return { ...item, quantity: item.quantity + 1 }; // Create a new object with updated quantity
            }
            return item;
          })
        );
      };

    return (
        shoppingList.map((item, key) => {
            return (
                <View key={key} style={[styles.flexRow, { padding: 5 }]}>
                    <PrimaryView style={[styles.flexRow, { marginLeft: 5, borderRadius: 15, width: 'auto', padding: 5, elevation: 1 }]}>
                        <View style={[styles.flexRow, styles.justifiedApart, { width: '65%'}]}>
                            <TextPrimary style={[styles.listText, { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }]}>{item.name}</TextPrimary>
                            <TextPrimary style={[styles.listText, { fontSize: 12 }]}>{item.category}</TextPrimary>
                        </View>
                        <View style={[styles.flexRow, styles.justfiedEnd, { width: '35%' }]}>
                            <TextPrimary style={[styles.listText, { marginRight: 10 }]}>{item.quantity}</TextPrimary>
                            <TouchableOpacity onPress={() => setShoppingList([...shoppingList.filter((x) => x._id !== item._id)])} style={[styles.justified, { marginRight: 10 }]}>
                                <FontAwesome name="trash" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => decrementItem(item._id)} style={[styles.justified, { marginRight: 10 }]}>
                                <FontAwesome name="minus" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => incrementItem(item._id)} style={[styles.justified, { marginRight: 20 }]}>
                                <FontAwesome name="plus" size={20} color={theme.textPrimary} />
                            </TouchableOpacity>
                        </View>
                    </PrimaryView>
                </View>
            )
        })
    )
}