import React, { useCallback, useEffect, useState } from "react";
import { SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { TouchableOpacity } from 'react-native';
import { ShoppingList } from "./ShoppingSlice";
import { FlatList, View } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { styles } from "@/components/util/Theme";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "@/app/store/hooks";
import { useNavigation } from "expo-router";
import MultiButtonContextMenu from "@/components/widgets/misc/MultiButtonContextMenu";
import { ShoppingStackParamList } from "@/constants/types";
import { InventoryItem } from "../inventory/InventorySlice";

type ShoppingStackParam = {
  ViewShoppingList: { list: ShoppingList };
};

type ViewShoppingListProps = {
  route: RouteProp<ShoppingStackParam, "ViewShoppingList">;
};

export default function ViewShoppingList({ route }: ViewShoppingListProps) {
  const { list } = route.params; 
  const [shoppingList, setShoppingList] = useState<InventoryItem[]>(list.items);
  const theme = useAppSelector(state => state.theme.colors);
  const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();

  useEffect(() => {
    // Set the header title when the component mounts
    navigation.setOptions({ headerTitle: list.name });
  }, [navigation]);

  const decrementItem = (id: string | number) => {
    setShoppingList((prevList) =>
      prevList
        .map((item) => {
          if (item.id === id) {
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
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 }; // Create a new object with updated quantity
        }
        return item;
      })
    );
  };

  return (
    <SecondaryView style={styles.container}>
      {shoppingList.map((item, key) => {
        return (
          <View key={key} style={[styles.flexRow, { padding: 5, backgroundColor: 'transparent' }]}>
              <View style={[styles.flexRow, { backgroundColor: theme.background3, marginLeft: 5, borderRadius: 15, width: 'auto', padding: 5, elevation: 1 }]}>
                  <View style={[styles.flexRow, styles.justifiedApart, { width: '65%'}]}>
                      <TextPrimary style={[styles.listText, { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }]}>{item.name}</TextPrimary>
                      <TextPrimary style={[styles.listText, { fontSize: 12 }]}>{item.category}</TextPrimary>
                  </View>
                  <View style={[styles.flexRow, styles.justfiedEnd, { width: '35%' }]}>
                      <TextPrimary style={[styles.listText, { marginRight: 10 }]}>{item.quantity}</TextPrimary>
                      <TouchableOpacity onPress={() => decrementItem(item.id)} style={[styles.justified, { marginRight: 10 }]}>
                          <FontAwesome name="minus" size={20} color={theme.textPrimary} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => incrementItem(item.id)} style={[styles.justified, { marginRight: 20 }]}>
                          <FontAwesome name="plus" size={20} color={theme.textPrimary} />
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
        )
      })}
      <MultiButtonContextMenu 
        // Add buttons to the context menu
        buttons={[
          <TouchableOpacity 
            onPress={() => navigation.navigate('StartShopping', { name: list.name as string, list: list.items as InventoryItem[] })}
          >
            <FontAwesome5 name="shopping-cart" size={24} color={theme.iconColor} />
          </TouchableOpacity>
        ]} 
      />
    </SecondaryView>
  );
}
