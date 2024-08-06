import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { ListItem } from "@rneui/base";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, FontAwesome6, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { styles } from "@/components/util/Theme";
import { WidgetGridItemProps } from "@/constants/Types";
import { useRouter } from "expo-router";
import { LinearGradient, TextSecondary } from "@/components/Themed";
import { useAppSelector } from "@/app/store/hooks";

export default function ItemsCategoryWidget() {
    const [gridItems, setGridItems] = useState<WidgetGridItemProps[]>([])
    const router = useRouter();
    const theme = useAppSelector(state => state.theme);

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
        },
        {
          title: "Meat",
          icon: "food-steak",
          component: MaterialCommunityIcons,
          size: 1,
        },
        {
          title: "Produce",
          icon: "leaf",
          component: FontAwesome6,
          size: 1,
        },
        {
          title: "Frozen",
          icon: "snowflake",
          component: FontAwesome6,
          size: 1,
        },
        {
          title: "Beverages",
          icon: "coffeescript",
          component: Fontisto,
          size: 1,
        },
        {
          title: "Canned",
          icon: "jar",
          component: FontAwesome6,
          size: 1,
        },
        {
          title: "Bakery",
          icon: "bread-slice",
          component: FontAwesome6,
          size: 1,
        },
        {
          title: "Pantry",
          icon: "library-shelves",
          component: MaterialCommunityIcons,
          size: 1,
        },
        {
          title: "Snacks",
          icon: "cookie",
          component: FontAwesome6,
          size: 1,
        },
        {
          title: "Household",
          icon: "emoji-food-beverage",
          component: MaterialIcons,
          size: 1,
        },
        {
          title: "Personal Care",
          icon: "soap",
          component: FontAwesome6,
          size: 1,
        },
        {
          title: "Miscellaneous",
          icon: "other-houses",
          component: MaterialIcons,
          size: 1,
        }
      ]

    useEffect(() => {
        // For now, we will just display static grid items
        setGridItems(staticGridItems)
    }, [])

    const handleSelection = (item: WidgetGridItemProps) => {
    //   router.push({
    //     pathname: "/modal",
    //     params: { modal: 'SearchResultsModal', title: `${item.title}`, navigationParam: 'InventoryItemInfo' }, 
    //   });
    }

    return (
        <LinearGradient 
          style={styles.gridContainer} 
          colors={[]}        
        >
          <View style={[styles.flexRow, styles.justifiedStart]}>
            <Text style={[styles.getStartedText, { textAlign: 'left' }]}>
              Categories
            </Text>
          </View>
            {gridItems && 
                <FlatList
                  scrollEnabled={false}
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
                            onPress={() => handleSelection(item)}
                        >
                            <View
                                style={styles.gridItem}
                            >
                                <item.component
                                    name={item.icon as string}
                                    size={30}
                                    color={theme.colors.iconColor}
                                />
                                <ListItem.Title style={[styles.description, {color: theme.colors.iconColor}]}>
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
