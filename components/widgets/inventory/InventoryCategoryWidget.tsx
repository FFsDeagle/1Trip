import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from "@rneui/base";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, FontAwesome6, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { styles } from "@/components/util/Theme";
import { WidgetGridItemProps } from "@/constants/Types";
import { LinearGradient } from "expo-linear-gradient";

export default function InventoryCategoryWidget() {
    const [gridItems, setGridItems] = useState<WidgetGridItemProps[]>([])

    // Static grid items for testing
    // Can add more dynamic types to the grid items such as a component to render
    // These can be stored on the server and fetched dynamically
    // For certain events different menu items will appear
    const staticGridItems = [
        {
          title: "Dairy",
          icon: "cow",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Meat",
          icon: "food-steak",
          component: MaterialCommunityIcons,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Produce",
          icon: "leaf",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Frozen",
          icon: "snowflake",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Beverages",
          icon: "coffeescript",
          component: Fontisto,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Canned",
          icon: "jar",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Bakery",
          icon: "bread-slice",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Pantry",
          icon: "library-shelves",
          component: MaterialCommunityIcons,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Snacks",
          icon: "cookie",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Household",
          icon: "emoji-food-beverage",
          component: MaterialIcons,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Personal Care",
          icon: "soap",
          component: FontAwesome6,
          size: 1,
          iconColor: '#C8E5EE',
        },
        {
          title: "Miscellaneous",
          icon: "other-houses",
          component: MaterialIcons,
          size: 1,
          iconColor: '#C8E5EE',
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
                Categories
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
                                    name={item.icon as string}
                                    size={30}
                                    color={item.iconColor}
                                />
                                <ListItem.Title style={[styles.description, {color: item.iconColor}]}>
                                    {item.title}
                                </ListItem.Title>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            }
        </LinearGradient>
    )
}
