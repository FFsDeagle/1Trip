import { TouchableOpacity, View } from "react-native";
import { InventoryItem } from "../../items/ItemSlice";
import { Dispatch, SetStateAction } from "react";
import { InventoryItem as Item } from "../../inventory/InventorySlice";
import { TextSecondary } from "@/components/Themed";
import { styles } from "@/components/util/Theme";

type RenderAllItemsProps = {
    items: InventoryItem[];
    shoppingList: Item[];
    setShoppingList: Dispatch<SetStateAction<Item[]>>;
}

export function RenderAllItems({ items, shoppingList, setShoppingList, }: RenderAllItemsProps){
    return (
        <View>
            {
                items && items.length > 0 && items.map((item, key) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // First check if the item exists in the shopping list
                                const exists = shoppingList.find((i) => i._id === item._id);
                                if (exists) {
                                    // If the item exists, update the quantity
                                    setShoppingList(shoppingList.map((i) => {
                                        if (i._id === item._id) {
                                            i.quantity += item.uom;
                                        }
                                        return i;
                                    }));
                                return;
                                } // If the item does not exist, add it to the shopping list
                                setShoppingList([...shoppingList, {
                                    _id: item._id, name: item.name, category: item.category,
                                    quantity: item.uom,
                                }]);
                            }}
                            key={key} 
                            style={styles.listItem}
                        >
                            <TextSecondary>
                                {item.name}
                            </TextSecondary>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}