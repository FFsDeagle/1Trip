import { TextSecondary } from "@/components/Themed";
import { InventoryItem } from "../../items/ItemSlice";
import { styles } from "@/components/util/Theme";
import { CategorySelection } from "./CreateShoppingList";
import { TouchableOpacity } from "@/components/Themed";
import { View } from "react-native";

type RenderFavoriteItemsProps = {
    categoryItems: CategorySelection[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function RenderCategoryItems({ categoryItems, setSelectedCategory }: RenderFavoriteItemsProps) {
    return (
        <View>
            {categoryItems && categoryItems.map((item, key) => {
            return (
                <TouchableOpacity
                    onPress={() => setSelectedCategory(item.name)}
                    key={key} 
                    style={styles.listItem}
                >
                    <TextSecondary>
                        {item.name}
                    </TextSecondary>
                </TouchableOpacity>
            )})}
        </View>
    );
}