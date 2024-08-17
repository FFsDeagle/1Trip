import { TextSecondary, TouchableOpacity } from "@/components/Themed";
import { InventoryItem } from "../../inventory/InventorySlice";
import { InventoryItem as Item } from "../../items/ItemSlice";
import { styles } from "@/components/util/Theme";
import { SetStateAction } from "react";

type RenderFavoriteItemsProps = {
    favList: Item[];
    setShoppingList: React.Dispatch<SetStateAction<InventoryItem[]>>; // Change the type of setShoppingList prop
    shoppingList: InventoryItem[];
}

export default function RenderFavoriteItems({ shoppingList, setShoppingList ,favList }: RenderFavoriteItemsProps) {
    return (
        favList && favList.map((item) => {
            return (
                <TouchableOpacity onPress={() => {
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
                }} key={item.id} style={styles.listItem}>
                    <TextSecondary key={item.id} style={styles.listText}>{item.name}</TextSecondary>
                </TouchableOpacity>
            )
        })
    );
}