import { ListItem } from "@rneui/base";
import React, { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { InventoryStackParamList } from "@/constants/Types";
import { NavigationProp } from "@react-navigation/native";

export default function SearchResultsModal() {
  const navigation = useNavigation<NavigationProp<InventoryStackParamList, 'InventoryItemInfo'>>();
    const params = useLocalSearchParams();
    const items = [
        {
            name: 'Test Item 1',
        },
        {
            name: 'Test Item 2',
        }
    ];

    return (
        <View>
            {items.map((item, index) => (
                <ListItem
                    key={index}
                >
                    <TouchableOpacity
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                    onPress={() => navigation.navigate('InventoryItemInfo', { searchValue: item.name })}
                    >
                        <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
                    </TouchableOpacity>
                </ListItem>
            ))}
        </View>
    )
}

