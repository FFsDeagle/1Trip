import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/constants/Types";

// Props for size and color
export default function DashboardModal() {
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
        <View>
            
        </View>
        // items.map((item, index) => (
        //     <ListItem
        //         key={index}
        //         style={styles.listItem}
        //     >
        //         <TouchableOpacity
        //             style={{
        //                 display: 'flex',
        //                 flexDirection: 'column',
        //                 alignItems: 'center',
        //                 width: '100%',
        //             }}
        //             onPress={() => navigate.navigate(item.navigation)}
        //         >
        //             <ListItem.Title style={styles.title}>{item.name}</ListItem.Title>
        //         </TouchableOpacity>
        //     </ListItem>
        // ))
    )
}

