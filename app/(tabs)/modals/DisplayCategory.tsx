import { ListItem, Text } from "@rneui/base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "@/components/util/Theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/components/util/Types";
import { View } from "@/components/Themed";

// Props for size and color
export default function DisplayCategory() {
    const navigate = useNavigation<NavigationProp<RootStackParamList>>();

    type Item = {
        name: string;
        navigation: keyof RootStackParamList;
    };

    const items: Item[] = [
        {
            name:  'Logout',
            navigation: 'Login',
        }
    ];

    return (
        <View style={styles.container}>
            {
                items.map((item, index) => (
                    <ListItem
                        key={index}
                        style={styles.listItem}
                    >
                        <TouchableOpacity
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                width: '100%',
                            }}
                            onPress={() => navigate.navigate(item.navigation)}
                        >
                            <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
                        </TouchableOpacity>
                    </ListItem>
                ))
            }
        </View>
    )
}

