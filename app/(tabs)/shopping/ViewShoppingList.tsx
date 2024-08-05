import React, { useEffect } from "react";
import { SecondaryView, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { ShoppingList } from "./ShoppingSlice";
import { FlatList, View } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { styles } from "@/components/util/Theme";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "@/app/store/hooks";
import { useNavigation } from "expo-router";

type ShoppingStackParamList = {
  ViewShoppingList: { list: ShoppingList };
};

type ViewShoppingListProps = {
  route: RouteProp<ShoppingStackParamList, "ViewShoppingList">;
};

export default function ViewShoppingList({ route }: ViewShoppingListProps) {
  const { list } = route.params; 
  const theme = useAppSelector(state => state.theme);
  const navigation = useNavigation();

  useEffect(() => {
    // Set the header title when the component mounts
    navigation.setOptions({ headerTitle: list.name });
  }, [navigation]);

  return (
    <SecondaryView>
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
    </SecondaryView>
  );
}
