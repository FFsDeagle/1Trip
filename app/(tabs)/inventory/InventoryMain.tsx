import { styles } from "@/components/util/Theme";
import InventoryCategoryWidget from "@/components/widgets/inventory/InventoryCategoryWidget";
import AddInventoryItemButton from "@/app/(tabs)/inventory/AddInventoryItemButton";
import { SecondaryView, TextPrimary, TextSecondary, ScrollView } from "@/components/Themed";
import { View } from "react-native";
import { useAppSelector } from "@/app/store/hooks";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import { InventoryItem } from "./InventorySlice";
import { MaterialIcons } from "@expo/vector-icons";

interface InventoryMainProps {
  category: string;
  quantity: number;
}

export default function InventoryMain() {
  const items = useAppSelector(state => state.inventory.inventoryItems);
  const [category, setCategory] = useState<InventoryMainProps[]>([]);
  const theme = useAppSelector(state => state.theme);

  useFocusEffect(
    useCallback(() => {
      if (items){
        listCategories(items);
      }
    }, [items])
  );

  const listCategories = (items: InventoryItem[]) => {
    const categoryMap = new Map();

    // Aggregate items by category
    items.forEach(item => {
      console.log('Item Category:', item.category);
      if (categoryMap.has(item.category)) {
        categoryMap.set(item.category, categoryMap.get(item.category) + item.quantity);
      } else {
        categoryMap.set(item.category, item.quantity);
      }
    });

    // Convert map to array
    const updatedCategories = Array.from(categoryMap, ([category, quantity]) => ({ category, quantity }));

    setCategory(updatedCategories);  // Update state once
  };

  return(
    <SecondaryView style={styles.container}>
      <ScrollView style={styles.container}>
          <InventoryCategoryWidget />
          <TextSecondary style={[styles.header2, {color: theme.colors.background}]}>Stock Qty by Category <MaterialIcons name="category" size={24} color={theme.colors.iconColor} /></TextSecondary>
          {category.length > 0 ? category?.map((item, index) => {
            return (
            <View style={[styles.flexRow, styles.listItem]} key={index}>
              <TextSecondary style={styles.listText}>
                {item.category}
              </TextSecondary>
              <TextSecondary style={styles.listText}>
                {item.quantity}
              </TextSecondary>
            </View>
          )}) : 
          <View style={[styles.flexRow, styles.listItem]}>
            <TextPrimary style={styles.listText}>
              No items found
            </TextPrimary>
          </View>}
        </ScrollView>
      <AddInventoryItemButton />
    </SecondaryView>
    );
};