import { TextSecondary } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import { CategorySelection } from "./CreateShoppingList";
import { TouchableOpacity } from "@/components/Themed";
import { View } from "react-native";
import { Dispatch, useState, SetStateAction } from "react";
import { InventoryItem } from "../../items/ItemSlice";
import { InventoryItem as Item } from "../../inventory/InventorySlice";

type RenderFavoriteItemsProps = {
    categoryItems: CategorySelection[];
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    selectedCategoryItems: InventoryItem[];
    setMenu: Dispatch<SetStateAction<string>>;
    setShoppingList: Dispatch<SetStateAction<Item[]>>;
    shoppingList: Item[];
}

export default function RenderCategoryItems({ shoppingList, setShoppingList, setMenu, selectedCategoryItems, categoryItems, setSelectedCategory }: RenderFavoriteItemsProps) {
    return (
        <View>
            {
                selectedCategoryItems.length > 0 ? selectedCategoryItems.map((item, key) => {
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
                                    lastAddedDate: new Date(Date.now()),
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
                }) :
                categoryItems && categoryItems.map((item, key) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedCategory(item.name);
                                setMenu('individualCategory');
                                console.log('individualCategory Set in RenderCategoryItems');
                            }}
                            key={key} 
                            style={styles.listItem}
                        >
                            <TextSecondary>
                                {item.name}
                            </TextSecondary>
                        </TouchableOpacity>
                )})
            }

        </View>
    );
}