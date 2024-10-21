import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { SecondaryView, TextPrimary, TextSecondary, ThirdView } from "@/components/Themed";
import { ScrollView, TouchableOpacity } from 'react-native';
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



type ViewShoppingListProps = {
  route: RouteProp<ShoppingStackParamList, "ViewShoppingList">;
};

export default function ViewShoppingList({ route }: ViewShoppingListProps) {
  const { list, listType } = route.params; 
  const [shoppingList, setShoppingList] = useState<InventoryItem[]>([]);
  const theme = useAppSelector(state => state.theme.colors);
  const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
  const [displayEditButton, setDisplayEditButton] = useState<boolean>(false);
  const [buttonList, setButtonList] = useState<ReactElement[]>([
    <TouchableOpacity 
      onPress={() => navigation.navigate('StartShopping', { name: list.name as string, list: list as ShoppingList, listType })}
    >
      <FontAwesome5 name="shopping-cart" size={24} color={theme.iconColor} />
    </TouchableOpacity>
  ]);

  // To be added to slice
  // Add functionality to create custom categories
  // Stored on slice/db
  const categoryOrder = [
    "Dairy",
    "Meat",
    "Produce",
    "Frozen",
    "Beverages",
    "Canned",
    "Bakery",
    "Pantry",
    "Snacks",
    "Household",
    "Personal Care",
    "Miscellaneous"
  ]

  useEffect(() => {
    if (listType === 'savedList' || listType === 'historyList'){
      setButtonList([...buttonList, 
        <TouchableOpacity 
          onPress={() => navigation.navigate('CreateShoppingList')} // { name: list.name as string, list: list as ShoppingList, listType }
        >
          <FontAwesome5 name="shopping-cart" size={24} color={theme.iconColor} />
        </TouchableOpacity>
      ])
    }
  },[])

  useEffect(() => {
    // Set the header title when the component mounts
    navigation.setOptions({ headerTitle: list.name });
  }, [navigation]);

  useEffect(() => {
    // Organize shopping list by categories asc
    const categorizedList = [...list.items].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      if (indexA < indexB) return 1;
      else if (indexA > indexB) return -1;
      return 0;
    });
    setShoppingList(categorizedList);
  }, []);

  return (
    <ThirdView style={[styles.container, styles.flexColumn, styles.justifiedStart]}>
      <ScrollView>
        {shoppingList.map((item) => {
          return (
            <View key={item._id} style={[styles.flexRow, { padding: 5, backgroundColor: 'transparent' }]}>
                <View style={[styles.flexRow, { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 5, width: 'auto', padding: 5 }]}>
                    <View style={[styles.flexRow, styles.justifiedApart, { width: '65%'}]}>
                        <TextPrimary style={[styles.listText, { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }]}>{item.name}</TextPrimary>
                        <TextPrimary style={[styles.listText, { fontSize: 12, letterSpacing: 1 }]}>{item.category}</TextPrimary>
                    </View>
                    <View style={[styles.flexRow, styles.justfiedEnd, { width: '35%' }]}>
                        <TextPrimary style={[styles.listText, { marginRight: 10 }]}>{item.quantity}</TextPrimary>
                    </View>
                </View>
            </View>
          )
        })}
      </ScrollView>
      <MultiButtonContextMenu 
        // Add buttons to the context menu
        buttons={[
          <TouchableOpacity 
            onPress={() => navigation.navigate('StartShopping', { name: list.name as string, list, listType })}
          >
            <FontAwesome5 name="shopping-cart" size={24} color={theme.iconColor} />
          </TouchableOpacity>,
          <TouchableOpacity
            onPress={() => navigation.navigate('CreateShoppingList')} // { name: list.name as string, list, listType })
          >
            <FontAwesome5 name="edit" size={24} color={theme.iconColor} />
          </TouchableOpacity>          
        ]} 
      />
    </ThirdView>
  );
}
