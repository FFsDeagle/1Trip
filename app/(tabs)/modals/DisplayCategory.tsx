import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "@/components/util/Theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/constants/types";
import { SecondaryView } from "@/components/Themed";

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
        <SecondaryView style={styles.container}>
            {
                items.map((item, index) => (
                    <TouchableOpacity
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
                            <SecondaryView style={styles.title}>{item.name}</SecondaryView>
                        </TouchableOpacity>
                    </TouchableOpacity>
                ))
            }
        </SecondaryView>
    )
}

