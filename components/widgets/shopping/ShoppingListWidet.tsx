import { useAppSelector } from "@/app/store/hooks";
import { PrimaryView, ScrollView, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { Text, TouchableOpacity } from 'react-native';
import { styles } from "@/components/util/Theme";
import { ShoppingStackParamList, ViewShoppingListTypeProps } from "@/constants/types";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useFocusEffect, useNavigation } from "expo-router";
import { View } from "react-native";
import { ShoppingList, ShoppingListTypes } from "@/app/(tabs)/shopping/ShoppingSlice";
import { useCallback, useEffect, useState } from "react";

type selectionType = {
    listType: string;
    title: string;
    icon: React.JSX.Element;
    items: ShoppingList[];
}

export default function ShoppingListWidget() {
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const theme = useAppSelector(state => state.theme.colors);
    const shoppingLists = useAppSelector(state => state.shoppingLists);
    const [cards, setCards] = useState<selectionType[]>([]);
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);

    useEffect(() => {
        setCards(
            [
                {
                    listType: 'savedLists',
                    title: 'Saved Lists',
                    icon: <FontAwesome5 color={theme.iconColor} size={24} name="save" />,
                    items: shoppingLists.lists.savedLists as ShoppingList[],
                },
                {
                    listType: 'incompleteLists',
                    title: 'Incomplete Lists',
                    icon: <MaterialIcons color={theme.iconColor} size={24} name="error-outline" />,
                    items: shoppingLists.lists.incompleteLists as ShoppingList[],
                },
                {
                    listType: 'generatedLists',
                    title: 'Generated Lists',
                    icon: <MaterialIcons color={theme.iconColor} size={24} name="auto-awesome-motion" />,
                    items: shoppingLists.lists.generatedLists as ShoppingList[],
                },
                {
                    listType: 'history',
                    title: 'History',
                    icon: <FontAwesome5 color={theme.iconColor} size={24} name="history" />,
                    items: shoppingLists.lists.history as ShoppingList[],
                },
            ]
        )
    },[shoppingLists])

    useEffect(() => {
        if (!cards || cards.length === 0) return;
        const hasItems = cards.some(card => card.listType == 'savedLists' && card.items && card.items.length > 0);
        setDisplayMessage(!hasItems);

    },[cards])

    const handlePress = (listType: ViewShoppingListTypeProps) => {
        navigation.navigate('ViewShoppingListType', { list: listType });
    }

    return (
        <View style={[styles.justifiedCenter, { paddingBottom: 10, backgroundColor: 'transparent' }]}>
            {displayMessage && <View style={[styles.justifiedCenter, { marginTop: 25 }]}><TextSecondary>Create a new shopping list to get started</TextSecondary></View>}
            {cards && cards.map((card, key) => {
                if (!card.items || card.items.length === 0) return;
                return (
                    <SecondaryView
                        key={key}
                        style={[
                            styles.cardContainer,
                            styles.flexColumn,
                            { overflow: 'hidden', padding: 5 }
                        ]}
                    >
                        <View style={[styles.justifiedApart, styles.flexRow, { padding: 5, marginTop: 5 }]}>
                            <View
                                style={[styles.flexRow, { }]}>
                                {card.icon}
                                <TextPrimary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                                    {card.title}
                                </TextPrimary>
                            </View>
                            <TouchableOpacity
                                style={[styles.justifiedCenter, { right: 20 }]}
                                onPress={() => handlePress({ listType: card.listType, title: card.title})}
                            >
                                <FontAwesome5 color={theme.iconColor} size={20} name="chevron-right" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={{}} horizontal={true}>
                            {
                                shoppingLists && shoppingLists.lists[card.listType as keyof ShoppingListTypes]
                                    .slice(-5)
                                    .reverse()
                                    .map((list, key) => {
                                        return (
                                            <TouchableOpacity 
                                                key={key} 
                                                onPress={() => navigation.navigate('ViewShoppingList', { name: list.name, list, listType: card.listType })}
                                                style={[
                                                    styles.container,
                                                    styles.justifiedCenter,
                                                    {
                                                        margin: 5,
                                                        width: 90,
                                                        height: '90%',
                                                        borderRadius: 20,
                                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                                    }
                                                ]}
                                            >
                                                <TextSecondary>
                                                    {list.name}
                                                </TextSecondary>
                                            </TouchableOpacity>
                                        )
                                    })
                            }
                        </ScrollView>
                    </SecondaryView>
                )
            })
        }
        </View>
    )
}