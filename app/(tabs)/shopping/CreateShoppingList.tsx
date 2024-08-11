import { LinearGradient, PrimaryView, ScrollView, SecondaryView, TextPrimary, TextSecondary, TouchableOpacity as Touchable} from "@/components/Themed";
import { PanResponder, TouchableOpacity } from "react-native";
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { InventoryItem } from "../items/ItemSlice";
import { Animated, FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DraggableItem from "@/components/animations/DraggableItem";
import { getItemList } from "../items/ItemSlice";

type CategorySelection = {
    name: string;
    items: InventoryItem[];
}

export default function CreateShoppingList() {
    const [menu, setMenu] = useState<string>('');
    const [list, setList] = useState<InventoryItem[]>([] as InventoryItem[]);
    const [categoryItems, setCategoryItems] = useState<CategorySelection[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const theme = useAppSelector(state => state.theme.colors);
    const items = useAppSelector(state => state.item.items);
    const dispatch = useAppDispatch();

    const menuSelection = [
        { key: 'Favorites', iconComponent: <FontAwesome5 name="star" color={theme.iconColor2} size={30} /> },
        { key: 'Categories', iconComponent: <MaterialIcons name="category" color={theme.iconColor2} size={30} /> },
        { key: 'All', iconComponent: <FontAwesome5 name="clipboard-list" color={theme.iconColor2} size={30} /> },
    ]

    useEffect(() => {
        getItemsBySelection();
    },[menu])

    useEffect(() => {
        dispatch(getItemList());
    },[])
    
    const getItemsBySelection = async () => {
        // Clear list
        setList([]);
        setCategoryItems([]);
        switch(menu){
            case 'Favorites':
                const filteredItems = items.filter(item => item.isFavorite === true);
                setList([...filteredItems]);
                //dispatch(getFavItems());
                break;
            case 'Categories':
                const categories = items.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
                setCategoryItems(categories.map(category => {
                    return { name: category, items: items.filter(item => item.category === category) }
                }));
                break;
            default:
                break;
        }
    }

    return (
        <LinearGradient 
            style={[styles.container]}
            colors={[]}
        >
            <SecondaryView style={[{height: '50%'}]}>
                <PrimaryView style={[styles.listItem]}>
                    <View style={[styles.flexRow, styles.justifiedApart, {width: '80%'}]}>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextSecondary style={[styles.listText]}>Name </TextSecondary>
                            <TextSecondary style={[styles.listText, {borderColor: theme.textSecondary, borderLeftWidth: 1, marginLeft: 20, paddingLeft: 30 }]}>Category</TextSecondary>
                        </View>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextSecondary style={[styles.listText]}>Qty </TextSecondary>
                        </View>
                    </View>
                </PrimaryView>
            </SecondaryView>
            <PrimaryView style={[styles.justifiedApart, styles.container, { height: '50%' }]}>
                {
                    menu === '' ?
                    <FlatList
                    data={menuSelection}
                    numColumns={4}
                    renderItem={({item}) => 
                        <TouchableOpacity
                            style={[
                                styles.listItem, 
                                styles.flexRow, 
                                styles.justifiedCenter, 
                                { width: '25%', height: 100 }
                            ]}
                            onPress={() => {
                                setMenu(item.key)
                            }}
                        >
                            {item.iconComponent}
                        </TouchableOpacity>
                    }
                />
            
                :
                    <SecondaryView style={[styles.container, { elevation: 5 }]}>
                        <PrimaryView style={[styles.listItem]}>
                            <ScrollView>
                                <View style={[styles.flexRow, styles.justifiedApart]}>
                                    <View style={[styles.flexRow, { width: 'auto' }]}>
                                        <TextSecondary style={[styles.listText]}>Name </TextSecondary>
                                        <TextSecondary style={[styles.listText, {borderColor: theme.textSecondary, borderLeftWidth: 1, marginLeft: 20, paddingLeft: 30 }]}>Category</TextSecondary>
                                    </View>
                                    <TouchableOpacity onPress={() => setMenu('')} style={[styles.flexRow, { width: 'auto', right: 10 }]}>
                                        <FontAwesome5 name="arrow-left" color="green" size={30} />
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </PrimaryView>
                        <ScrollView>
                            {/* Create a component for each map type? */}
                            {list && list.map((item) => {
                                return (
                                    <TextSecondary key={item.id} style={styles.listItem}>{item.name}</TextSecondary>
                                )
                            })}
                            {categoryItems && categoryItems.map((item, key) => {
                                return (
                                    <Touchable
                                        onPress={() => setSelectedCategory(item.name)}
                                        key={key} 
                                        style={styles.listItem}
                                    >
                                        <TextSecondary>
                                            {item.name}
                                        </TextSecondary>
                                    </Touchable>
                                )
                            })}
                            {
                                selectedCategory && categoryItems.filter(item => item.name === selectedCategory)[0].items.map((item, key) => {
                                    return (
                                        <TextSecondary key={key} style={styles.listItem}>{item.name}</TextSecondary>
                                    )
                                })
                            }
                        </ScrollView>
                    </SecondaryView>

            }
            </PrimaryView>
            <BackButton />
        </LinearGradient>
    )
};