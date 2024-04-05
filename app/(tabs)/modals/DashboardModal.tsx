import { ListItem, Text } from "@rneui/base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "@/components/util/Theme";

// Props for size and color
export default function DashboardModal() {
    const items = [
        {
            name: 'Settings',
            navigation: 'Settings',
        },
        {
            name:  'Profile',
            navigation: 'Profile',
        },
        {
            name:  'Logout',
            navigation: 'Login',
        }
    ];

    return (
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
                    onPress={() => console.log(`Navigate to: ${item.navigation} screen`)}
                >
                    <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
                </TouchableOpacity>
            </ListItem>
        ))
    )
}

