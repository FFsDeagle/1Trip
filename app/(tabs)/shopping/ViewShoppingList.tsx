import React, { useCallback, useEffect } from "react";
import { SecondaryView, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { ShoppingList } from "./ShoppingSlice";
import { FlatList, View } from "react-native";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { styles } from "@/components/util/Theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "@/app/store/hooks";
import { useFocusEffect, useNavigation } from "expo-router";
import MultiButtonContextMenu from "@/components/widgets/misc/MultiButtonContextMenu";
import { ShoppingStackParamList } from "@/constants/Types";

type ShoppingStackParam = {
  ViewShoppingList: { list: ShoppingList };
};

type ViewShoppingListProps = {
  route: RouteProp<ShoppingStackParam, "ViewShoppingList">;
};

export default function ViewShoppingList({ route }: ViewShoppingListProps) {
  const { list } = route.params; 
  const theme = useAppSelector(state => state.theme);
  const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();

  useEffect(() => {
    // Set the header title when the component mounts
    navigation.setOptions({ headerTitle: list.name });
  }, [navigation]);

  return (
    <SecondaryView style={styles.container}>
      <FlatList
        data={list.items}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => 
            (
                <View
                    style={styles.justifiedApart}
                >
                    <TextSecondary style={styles.listItem}>
                        {item.name}
                    </TextSecondary>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity style={[styles.justified, { marginRight: 10, marginLeft: 5 }]}>
                            <FontAwesome5 name='edit' size={24} color={theme.colors.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.justified, { marginRight: 10, marginLeft: 5 }]}>
                            <FontAwesome5 name='trash' size={24} color={theme.colors.iconColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
      />
      <MultiButtonContextMenu 
        // Add buttons to the context menu
        buttons={[
          <TouchableOpacity 
            onPress={() => navigation.navigate('StartShopping', { list })}
          >
            <FontAwesome5 name="shopping-cart" size={24} color={theme.colors.iconColor} />
          </TouchableOpacity>
        ]} 
      />
    </SecondaryView>
  );
}
