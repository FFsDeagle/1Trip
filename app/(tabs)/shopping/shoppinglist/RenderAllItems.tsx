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
                items.length > 0 && items.map((item, key) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // First check if the item exists in the shopping list
                                const exists = shoppingList.find((i) => i.id === item.id);
                                if (exists) {
                                    // If the item exists, update the quantity
                                    setShoppingList(shoppingList.map((i) => {
                                        if (i.id === item.id) {
                                            i.quantity += item.uom;
                                        }
                                        return i;
                                    }));
                                return;
                                } // If the item does not exist, add it to the shopping list
                                setShoppingList([...shoppingList, {
                                    id: item.id, name: item.name, category: item.category,
                                    description: item.description,
                                    quantity: item.uom,
                                    lastAddedDate: new Date(Date.now()).toISOString(),
                                    isPastExpiry: false
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