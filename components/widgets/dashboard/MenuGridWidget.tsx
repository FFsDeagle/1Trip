import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, FontAwesome6 } from "@expo/vector-icons";
import { styles } from "@/components/util/Theme";
import { WidgetGridItemProps } from "@/constants/Types";
import { LinearGradient } from "expo-linear-gradient";
import { useAppSelector } from "@/app/store/hooks";

export default function MenuGridWidget() {
    const [gridItems, setGridItems] = useState<WidgetGridItemProps[]>([])
    const theme = useAppSelector(state => state.theme);

    // Static grid items for testing
    // Can add more dynamic types to the grid items such as a component to render
    // These can be stored on the server and fetched dynamically
    // For certain events different menu items will appear
    const staticGridItems = [
        {
            component: AntDesign,
            title: 'Local',
            icon: 'shoppingcart',
            size: 1,
        },
        {
            component: AntDesign,
            title: 'Reports',
            icon: 'filetext1',
            size: 30,
        },
        {
            component: AntDesign,
            title: 'Settings',
            icon: 'setting',
            size: 30,
        },
        {
            component: AntDesign,
            title: 'Inventory',
            icon: 'inbox',
            size: 30,
        },
        {
            component: Ionicons,
            title: 'Cooking',
            icon: 'restaurant-outline',
            size: 30,
        },
        {
            component: MaterialCommunityIcons,
            title: 'Post',
            icon: 'post',
            size: 30,
        },
        {
            component: Feather,
            title: 'Messenger',
            icon: 'message-circle',
            size: 30,
        },
        {
            component: FontAwesome6,
            title: 'News',
            icon: 'newspaper',
            size: 30,
        }
    ]
    
    useEffect(() => {
        // For now, we will just display static grid items
        setGridItems(staticGridItems)
    }, [])

    return (
        <LinearGradient 
            style={styles.gridContainer}
            // dark purple colors
            colors={['#184E68', '#57CA85']}
        >
            <Text style={styles.getStartedText}>
                Quick links
            </Text>
            {gridItems && 
                <FlatList
                    data={gridItems}
                    numColumns={4} 
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    renderItem={({ index, item }) => (
                        <TouchableOpacity
                            style={{
                                width: 75,
                                margin: 5,
                            }}
                            key={index}
                            onPress={() => console.log(`${item.title} pressed`)}
                        >
                            <View
                                style={styles.gridItem}
                            >
                                <item.component
                                    name={item.icon as any}
                                    size={30}
                                    color={theme.colors.iconColor}
                                />
                                <Text style={[styles.description, {color: theme.colors.iconColor2, fontSize: 16}]}>
                                    {item.title}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            }
        </LinearGradient>
    )
}
