import { TextSecondary, TouchableOpacity } from "@/components/Themed";
import { InventoryItem } from "../../items/ItemSlice";
import { styles } from "@/components/util/Theme";
import { SetStateAction } from "react";

type RenderFavoriteItemsProps = {
    favList: InventoryItem[];
    setShoppingList: React.Dispatch<SetStateAction<InventoryItem[]>>; // Change the type of setShoppingList prop
    shoppingList: InventoryItem[];
}

export default function RenderFavoriteItems({ shoppingList, setShoppingList ,favList }: RenderFavoriteItemsProps) {
    return (
        favList && favList.map((item) => {
            return (
                <TouchableOpacity onPress={() => {
                    setShoppingList([...shoppingList, item]);
                    console.log('shoppingList', shoppingList);
                }} key={item.id} style={styles.listItem}>
                    <TextSecondary key={item.id} style={styles.listText}>{item.name}</TextSecondary>
                </TouchableOpacity>
            )
        })
    );
}