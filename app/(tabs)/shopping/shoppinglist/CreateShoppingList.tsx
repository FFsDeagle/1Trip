import { LinearGradient, PrimaryView, ScrollView, SecondaryView, TextPrimary, TextSecondary, TouchableOpacity as Touchable} from "@/components/Themed";
import { Dimensions, Easing, PanResponder, TouchableOpacity } from "react-native";
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { useEffect, useRef, useState } from "react";
import { InventoryItem } from "../../items/ItemSlice";
import { Animated, FlatList, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { getItemList } from "../../items/ItemSlice";
import RenderFavoriteItems from "./RenderFavoriteItems";
import RenderCategoryItems from "./RenderCategoryItems";
import DraggableItem from "@/components/animations/DraggableItem";
import RenderShoppingListItems from "./RenderShoppingListItems";

export type CategorySelection = {
    name: string;
    items: InventoryItem[];
};

export default function CreateShoppingList() {
    const [shoppingList, setShoppingList] = useState<InventoryItem[]>([]);
    const [menu, setMenu] = useState<string>('');
    const [favList, setFavList] = useState<InventoryItem[]>([] as InventoryItem[]);
    const [categoryItems, setCategoryItems] = useState<CategorySelection[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const theme = useAppSelector(state => state.theme.colors);
    const items = useAppSelector(state => state.item.items);
    const dimensionsY = Dimensions.get('window').height;
    const dimensionsX = Dimensions.get('window').width;
    const [containerHeight, setContainerHeight] = useState<number>(dimensionsY / 7.3);
    const dispatch = useAppDispatch();
    const initialHeight = dimensionsY / 7.3;
    const expandedHeight = dimensionsY / 2.5;
    const heightAnim = useRef(new Animated.Value(expandedHeight)).current;
    const centreContainerHeight = dimensionsY - (initialHeight * 2 + 30);
    const centreContainerAnim = useRef(new Animated.Value(centreContainerHeight)).current;
    const oppositeHeightAnim = useRef(new Animated.Value(dimensionsY - initialHeight)).current;
    const topPaneRef = useRef<View>(null);
    const [itemDragged, setItemDragged] = useState<boolean>(false);
    const pulseAnimation = useRef(new Animated.Value(0)).current;

    const menuSelection = [
        { key: 'Favorites', iconComponent: <FontAwesome5 name="star" color={theme.iconColor2} size={30} /> },
        { key: 'Categories', iconComponent: <MaterialIcons name="category" color={theme.iconColor2} size={30} /> },
        { key: 'All', iconComponent: <FontAwesome5 name="clipboard-list" color={theme.iconColor2} size={30} /> },
    ];

    useEffect(() => {
        getItemsBySelection();
        Animated.timing(heightAnim, {
            toValue: containerHeight,
            duration: 100,
            useNativeDriver: false,
        }).start();

        Animated.timing(oppositeHeightAnim, {
            toValue: dimensionsY - containerHeight,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }, [menu]);

    useEffect(() => {
        dispatch(getItemList());
    }, []);

    useEffect(() => {
        // If panresponder has actions then animate top pane
        if (itemDragged){
                Animated.sequence([
                    Animated.timing(pulseAnimation, {
                        toValue: 1,
                        easing: Easing.linear,
                        duration: 200,
                        useNativeDriver: false,
                    }),
                ]).start();
        }
        else {
            pulseAnimation.setValue(0);
        }
    }, [itemDragged]);

    const getItemsBySelection = () => {
        // Clear lists
        setFavList([]);
        setCategoryItems([]);

        switch(menu){
            case 'Favorites':
                setContainerHeight(initialHeight);
                const filteredItems = items.filter(item => item.isFavorite === true);
                setFavList([...filteredItems]);
                break;
            case 'Categories':
                const categories = items.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
                setCategoryItems(categories.map(category => {
                    return { name: category, items: items.filter(item => item.category === category) };
                }));
                setContainerHeight(initialHeight);
                break;
            case 'All':
                setContainerHeight(initialHeight);
                break;
            case '':
                setContainerHeight(expandedHeight);
                break;
            default:
                break;
        }
    };

    const handleDrop = (key: string, dropPosition: { x: number, y: number }) => {
        topPaneRef.current?.measure((x, y, width, height, pageX, pageY) => {
            const withinXBounds = dropPosition.x >= pageX && dropPosition.x <= PageX + width;
            const withinYBounds = dropPosition.y >= pageY && dropPosition.y <= PageY + height;
    
            if (withinXBounds && withinYBounds) {
                console.log(`Item ${key} dropped in the top pane!`);
                // Get the type, type = key
                // Get all related items based on selected key
                // Add to shoppingList state
            } else {
                console.log(`Item ${key} was not dropped in the top pane.`);
            }
        });
    };
    
    return (
        <LinearGradient 
            style={[styles.container]}
            colors={[]}
        >
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                height: '100%',
                width: '100%',
            }}>
                {/* Top Pane for Displaying Headers */}
                <PrimaryView style={[styles.listItem]}>
                    <View style={[styles.flexRow, styles.justifiedApart, { width: '80%' }]}>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextSecondary style={[styles.listText]}>Name</TextSecondary>
                            <TextSecondary style={[styles.listText, { borderColor: theme.textSecondary, borderLeftWidth: 1, marginLeft: 20, paddingLeft: 30 }]}>Category</TextSecondary>
                        </View>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextSecondary style={[styles.listText]}>Qty</TextSecondary>
                        </View>
                    </View>
                </PrimaryView>
                {/* Center Scroll View for Shopping List */}
                <Animated.ScrollView style={{ height: centreContainerHeight }}>
                    {   
                        shoppingList.length < 0 ? 
                        <TextSecondary style={[styles.title, { textAlign: 'center', height: initialHeight }]}>
                            Drag items to create your shopping list
                        </TextSecondary>
                        :
                        <RenderShoppingListItems shoppingList={shoppingList} setShoppingList={setShoppingList} />
                    }
                </Animated.ScrollView>
                {/* Bottom Pane with Draggable Items */}
                <Animated.View style={[styles.justified, { width: '100%', height: heightAnim, backgroundColor: theme.secondary }]}>
                    <View style={[styles.flexRow, styles.justifiedApart, { width: '60%' }]}>
                        {menu === '' && menuSelection.map((item, key) => (
                            <DraggableItem
                                setItemDragged={setItemDragged}
                                key={item.key}
                                item={item}
                                style={[{ padding: 10, zIndex: 100 }]}
                                setMenu={setMenu}
                                onDrop={handleDrop}
                            />
                        ))}
                        {/* Drop Target in the Header */}
                        <Animated.View
                            ref={topPaneRef}
                            style={[styles.justified, styles.container, {
                                height: initialHeight,
                                borderTopLeftRadius: 25,
                                borderTopRightRadius: 25,
                                backgroundColor: 'lightgrey',
                                opacity: pulseAnimation,
                                position: 'absolute',
                                zIndex: 90,
                                right: 0,
                                bottom: initialHeight - 22.5,
                            }]}
                        >
                            {itemDragged && <FontAwesome5 name="plus" color="black" size={50} />}
                        </Animated.View>
                    </View>
                    {menu !== '' &&
                        <Animated.ScrollView style={{ width: '100%'}}>
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
                            <RenderFavoriteItems shoppingList={shoppingList} setShoppingList={setShoppingList} favList={favList} />
                            <RenderCategoryItems categoryItems={categoryItems} setSelectedCategory={setSelectedCategory} />
                        </Animated.ScrollView>}
                </Animated.View>
            </View>
        </LinearGradient>
    );
};
