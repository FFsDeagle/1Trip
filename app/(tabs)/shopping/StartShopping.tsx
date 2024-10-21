import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { ScrollView, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import MultiButtonContextMenu from "@/components/widgets/misc/MultiButtonContextMenu";
import { ShoppingStackParamList } from "@/constants/types";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View } from "react-native";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";
import { useEffect, useState } from "react";
import { DeleteIncompleteList, SaveIncompleteList, SaveToHistory, ShoppingList } from "./ShoppingSlice";
import { Categories } from "../items/ItemSlice";

type ViewShoppingListProps = {
    route: RouteProp<ShoppingStackParamList, 'StartShopping'>;
};

interface CategoryChunk {
    category: Categories;
    items: SelectionProps[];
}

interface SelectionProps {
    isChecked: boolean;
    item: InventoryItem;
}

export default function StartShopping({ route }: ViewShoppingListProps){
    const { list, name, listType } = route.params;
    const theme = useAppSelector(state => state.theme.colors);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const dispatch = useAppDispatch();
    const [shoppingList, setShoppingList] = useState<ShoppingList>(list);
    const { id } = useAppSelector(state => state.login.loginResponse);
    const { categories } = useAppSelector(state => state.item);
    const [chunkedCategories, setChunkedCategories] = useState<CategoryChunk[]>([]);

    // Assign list items in chunks for categories to display
    useEffect(() => {
        const chunkedCategories: CategoryChunk[] = categories.map(category => {
            return {
                category: category,
                items: shoppingList.items
                    .filter(item => item.category === category.name)
                    .map(item => ({
                        isChecked: false,
                        item: item
                    }))
            }
        })
        const filteredChunk = chunkedCategories.filter(category => category.items.length > 0);
        setChunkedCategories(filteredChunk);
    }, [])

    const handleSubmit = async () => {
        // Get unchecked items and save into incompleteLists
        const remainingItems: ShoppingList = {
            _id: list._id,
            name: name,
            items: shoppingList.items.filter(item => 
            chunkedCategories.some(chunk => 
                chunk.items.some(chunkItem => chunkItem.item._id === item._id && !chunkItem.isChecked)
            ))
        }
        console.log('remainingItems list laskdjlaskdjlaskjd', remainingItems);
        if (remainingItems && remainingItems.items.length > 0){
            await dispatch(SaveIncompleteList({id, list: remainingItems}));
        }
        const checkedItems = shoppingList.items.filter(item => 
            chunkedCategories.some(chunk => 
                chunk.items.some(chunkItem => chunkItem.item._id === item._id && chunkItem.isChecked)
            ));
        // Disabled until further notice
        // await dispatch(AddListToInventory({ id, list: checkedItems }));
        const mutatedList: ShoppingList = {
            _id: list._id,
            items: checkedItems,
            name: name,
        }
        if (listType === "incompleteLists"){
            await dispatch(DeleteIncompleteList({ id, list: mutatedList }));
        }
        await dispatch(SaveToHistory({id, list: mutatedList}));
        navigation.navigate('ShoppingMain');
    }

    const decrementItem = (id: string | number) => {
        setChunkedCategories(chunkedCategories.map(category => {
            return {
                ...category,
                items: category.items.map(chunk => {
                    if (chunk.item._id === id) {
                        // if (chunk.item.quantity === 1) {
                        //     return null;
                        // }
                        if (chunk.item.quantity === 1) {
                            return chunk;
                        }
                        return {
                            ...chunk,
                            item: { ...chunk.item, quantity: chunk.item.quantity - 1 }
                        };
                    }
                    return chunk;
                }).filter((chunk): chunk is SelectionProps => chunk !== null)
            };
        }));
    }

    const incrementItem = (id: string | number) => {
        setChunkedCategories(chunkedCategories.map(category => {
            return {
                ...category,
                items: category.items.map(chunk => {
                    if (chunk.item._id === id) {
                        return {
                            ...chunk,
                            item: { ...chunk.item, quantity: chunk.item.quantity + 1 }
                        };
                    }
                    return chunk;
                })
            };
        }));
    }

    const renderItem = (chunk: CategoryChunk, isChecked: boolean) => {
        return chunk.items.map(item => (
            <View key={item.item._id} style={[styles.flexRow, { padding: 5, backgroundColor: 'transparent' }]}>
                <View 
                    style={[
                        styles.flexRow, 
                        { backgroundColor: item.isChecked ? 'darkgreen' : theme.background2, 
                            marginLeft: 5, borderRadius: 15, width: 'auto', padding: 5, elevation: 1 
                        }]}
                >
                    <View style={[styles.flexRow, styles.justifiedApart, { width: '65%' }]}>
                        <TextPrimary style={[styles.listText, { fontSize: 14, fontWeight: 'bold', letterSpacing: 1 }]}>{item.item.name}</TextPrimary>
                    </View>
                    <View style={[styles.flexRow, styles.justfiedEnd, { width: '35%' }]}>
                        <TextPrimary style={[styles.listText, { marginRight: 10 }]}>{item.item.quantity}</TextPrimary>
                        {!isChecked && <TouchableOpacity onPress={() => decrementItem(item.item._id)} style={[styles.justified, { marginRight: 10 }]}>
                            <FontAwesome name="minus" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>}
                        {!isChecked && <TouchableOpacity onPress={() => incrementItem(item.item._id)} style={[styles.justified, { marginRight: 20 }]}>
                            <FontAwesome name="plus" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>}
                        <TouchableOpacity onPress={() => 
                            setChunkedCategories(chunkedCategories.map(category => {
                                return {
                                    ...category,
                                    items: category.items.map(chunk => {
                                        if (chunk.item._id === item.item._id) {
                                            return {
                                                ...item,
                                                isChecked: !chunk.isChecked
                                            }
                                        }
                                        return chunk;
                                    })
                                }
                            }))
                         } style={[styles.justified, { marginRight: 20 }]}>
                            <FontAwesome name={item.isChecked ? 'times-circle' : "check-square"} size={20} color={theme.textPrimary} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ))
    }

    const renderCategory = (category: CategoryChunk) => {
        return (
            <View key={category.category.name} style={[styles.flexColumn, { backgroundColor: theme.background, borderRadius: 10, padding: 10, margin: 5, elevation: 5 }]}>
                <TextSecondary style={[styles.listText, { fontSize: 15, fontWeight: 'bold', letterSpacing: 1, color: theme.headerTitleColor }]}>{category.category.name}</TextSecondary>
                {renderItem(category, false)}
            </View>
        )
    }

    return (
        <SecondaryView>
            <ScrollView style={styles.container}>
                {
                    chunkedCategories && chunkedCategories.map(category => renderCategory(category))
                }
            </ScrollView>
            <MultiButtonContextMenu 
                // Add buttons to the context menu
                buttons={[
                    <TouchableOpacity 
                        onPress={handleSubmit}
                    >
                        <FontAwesome5 name="cash-register" size={24} color={theme.iconColor} />
                    </TouchableOpacity>
                ]} 
            />
        </SecondaryView>
    )
}