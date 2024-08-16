import { LinearGradient, PrimaryView, ScrollView, TextSecondary } from "@/components/Themed";
import { Dimensions, TouchableOpacity, TextInput } from "react-native";
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { useEffect, useRef, useState } from "react";
import { InventoryItem } from "../../items/ItemSlice";
import { InventoryItem as ShoppingListItem } from "../../inventory/InventorySlice";
import { Animated, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { getItemList } from "../../items/ItemSlice";
import RenderFavoriteItems from "./RenderFavoriteItems";
import RenderCategoryItems from "./RenderCategoryItems";
import DraggableItem from "@/components/animations/DraggableItem";
import RenderShoppingListItems from "./RenderShoppingListItems";
import { RenderAllItems } from "./RenderAllItems";

export type CategorySelection = {
    name: string;
    items: InventoryItem[];
};

export default function CreateShoppingList() {
    const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
    const [menu, setMenu] = useState<string>('');
    const [favList, setFavList] = useState<InventoryItem[]>([] as InventoryItem[]);
    const [categoryItems, setCategoryItems] = useState<CategorySelection[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [selectedCategoryItems, setSelectedCategoryItems] = useState<InventoryItem[]>([]);
    const theme = useAppSelector(state => state.theme.colors);
    const items = useAppSelector(state => state.item.items);
    const dimensionsY = Dimensions.get('window').height;
    const dispatch = useAppDispatch();
    const initialHeight = dimensionsY / 12;
    const expandedHeight = dimensionsY / 2.5;
    const heightAnim = useRef(new Animated.Value(initialHeight)).current;
    const centreContainerHeight = dimensionsY - (initialHeight * 2 + 30);
    const topPaneRef = useRef<View>(null);
    const [itemDragged, setItemDragged] = useState<boolean>(false);
    const pulseAnimation = useRef(new Animated.Value(0.5)).current;
    const [keyboardShown, setKeyboardShown] = useState<boolean>(false);

    const menuSelection = [
        { key: 'Favorites', iconComponent: <FontAwesome5 name="star" color={theme.iconColor2} size={24} /> },
        { key: 'Categories', iconComponent: <MaterialIcons name="category" color={theme.iconColor2} size={24} /> },
        { key: 'All', iconComponent: <FontAwesome5 name="clipboard-list" color={theme.iconColor2} size={24} /> },
    ];

    // Fetch items from the store
    useEffect(() => {
        if (items.length === 0) {
            dispatch(getItemList());
        }
        getItemsBySelection();
    }, [menu]);

    useEffect(() => {
        getItemsByCategory();
    },[selectedCategory]);

    const getItemsByCategory = () => {
        const items = categoryItems.map(category => category.items).flat();
        const selectedItems = items.filter(item => item.category === selectedCategory);
        setSelectedCategoryItems([...selectedItems]);
    }
    
    const closeContainer = () => {
        Animated.timing(heightAnim, {
            toValue: initialHeight,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }

    const openContainer = () => {
        Animated.timing(heightAnim, {
            toValue: expandedHeight,
            duration: 100,
            useNativeDriver: false,
        }).start();
    }

    const filterFavorites = () => {
        const filteredItems = items.filter(item => item.isFavorite === true);
        setFavList([...filteredItems]);
    }

    const filterCategories = () => {
        const categories = items.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
        setCategoryItems(categories.map(category => {
            return { name: category, items: items.filter(item => item.category === category) };
        }));
    }

    // Get items based on the selection
    const getItemsBySelection = () => {
        setFavList([]);
        setCategoryItems([]);
        // Clear lists
        console.log('getItemsBySelection: ', menu);
        switch(menu){
            case 'Favorites':
                filterFavorites();
                openContainer();
                break;
            case 'Categories':
                console.log('Filtering Categories');
                filterCategories();
                openContainer();
                break;
            case 'All':
                openContainer();
                break;
            case '':
                closeContainer();
                break;
            default:
                break;
        }
    };

    const checkBounds = (dropPosition: { x: number, y: number }, callBack: (isWithinBounds: boolean) => void) => {
        topPaneRef.current?.measure((x, y, width, height, pageX, pageY) => {
            const withinXBounds = dropPosition.x >= pageX && dropPosition.x <= pageX + width;
            const withinYBounds = dropPosition.y >= pageY && dropPosition.y <= pageY + height;
            callBack(withinXBounds && withinYBounds);   
        });
        return false;
    }

    const handleDrop = async (key: string, dropPosition: { x: number, y: number }) => {
        checkBounds(dropPosition, (iswithinBounds) => {
            iswithinBounds && addKeyItemsToList(key);
        })
    };

    const addKeyItemsToList = (key: string) => {
        console.log('Key: ', key);
        switch(key){
            case 'Favorites':
                setShoppingList([...shoppingList, ...items.filter(item => item.isFavorite === true).map(item => {
                    return {
                        id: item.id, name: item.name, category: item.category,
                        description: item.description,
                        quantity: item.uom,
                        lastAddedDate: new Date(Date.now()),
                        isPastExpiry: false
                    };
                })]);
                break;
            case 'Categories':
                //const categoryItem = categoryItems.map(category => category.items.find(item => item.id === key)).filter(Boolean)[0];
                const categoryItem = [...new Set(categoryItems.map(category => category.items).flat())].find(item => item.id === key);
                if (categoryItem) {
                    const exists = shoppingList.find((i) => i.category === categoryItem.category && i.id === categoryItem.id);
                    if (exists) {
                        setShoppingList(shoppingList.map((i) => {
                            if (i.id === categoryItem.id) {
                                i.quantity += 1;
                            }
                            return i;
                        }));
                        return;
                    }
                    setShoppingList([...shoppingList, ...items.filter(x => x.category === key).map(item => {
                        return {
                            id: item.id, name: item.name, category: item.category,
                            description: item.description,
                            quantity: item.uom,
                            lastAddedDate: new Date(Date.now()),
                            isPastExpiry: false
                        };
                    })]);
                }
                break;
            default:
                break;
        }
    };

    const handleDrag = (key: string, dragPosition: { x: number, y: number}) => {
        checkBounds(dragPosition, (iswithinBounds) => {
            iswithinBounds ?
            Animated.timing(pulseAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start() :
            Animated.timing(pulseAnimation, {
                toValue: 0.5,
                duration: 200,
                useNativeDriver: false,
            }).start();
        })
    };
    
    const handleBack = () => {
        console.log('Handling Back', menu);
        switch(menu){
            case 'Favorites':
                setMenu('');
                setFavList([]);
                break;
            case 'Categories':
                setMenu('');
                setCategoryItems([]);
                setSelectedCategoryItems([]);
                break;
            case 'individualCategory':
                setSelectedCategory('');
                setMenu('Categories');
                break;
            case 'All':
                setMenu('');
                break;
            default:
                break;
        }
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
                <View style={[styles.justifiedCenter, { width: '100%', marginTop: 20, marginBottom: 20 }]}>
                    <View style={[{ backgroundColor: theme.background2, elevation: 5, borderRadius: 15, width: '90%', padding: 10 }]}>
                        <TextInput
                            style={[{}]}
                            placeholder="Search for items"
                            placeholderTextColor={theme.textSecondary}
                        />
                    </View>
                </View>
                {/* Center Scroll View for Shopping List */}
                <Animated.ScrollView style={{ height: centreContainerHeight }}>
                    <Animated.View ref={topPaneRef} style={{height: centreContainerHeight}}>
                        {   
                            shoppingList.length === 0 ? 
                            <TextSecondary style={[styles.title, { textAlign: 'center', height: initialHeight, marginTop: 50 }]}>
                                Drag items to create your shopping list
                            </TextSecondary>
                            :
                            <View style={styles.container}>
                                <RenderShoppingListItems shoppingList={shoppingList} setShoppingList={setShoppingList} />
                            </View>
                        }
                    </Animated.View>
                </Animated.ScrollView>
                {/* Bottom Pane with Draggable Items */}
                <Animated.View style={[menu === '' ? styles.justified : styles.justifiedStart, { width: '100%', height: heightAnim, backgroundColor: theme.secondary }]}>
                    <View style={[styles.flexRow, styles.justifiedApart, { width: menu === '' ? '60%' : '100%', height: menu === '' ? 'auto' : '100%' }]}>
                        {menu === '' ? menuSelection.map((item) => (
                            <DraggableItem
                                setItemDragged={setItemDragged}
                                key={item.key}
                                item={item}
                                style={[{ zIndex: 100 }]}
                                setMenu={setMenu}
                                onDrop={handleDrop}
                                onDrag={handleDrag}
                            />
                        ))
                        :
                        <View style={{ width: '100%', }}>
                            <PrimaryView style={[styles.flexRow, styles.justifiedApart, { padding: 5 }]}>
                                <View style={[styles.flexRow, { width: 'auto' }]}>
                                    <TextSecondary style={[styles.header2]}>{
                                            selectedCategory === '' ? menu : selectedCategory
                                    }</TextSecondary>
                                </View>
                                <TouchableOpacity onPress={handleBack} style={[styles.justified, styles.flexRow, { width: 'auto', padding: 5, right: 15 }]}>
                                    {menu === '' ? <FontAwesome5 name="arrow-left" color={theme.iconColor2} size={30} />
                                    : <FontAwesome5 name="times" color={theme.iconColor2} size={30} />}
                                </TouchableOpacity>
                            </PrimaryView>
                            <ScrollView>
                                <RenderFavoriteItems shoppingList={shoppingList} setShoppingList={setShoppingList} favList={favList} />
                                <RenderCategoryItems shoppingList={shoppingList} setShoppingList={setShoppingList} setMenu={setMenu} selectedCategoryItems={selectedCategoryItems} categoryItems={categoryItems} setSelectedCategory={setSelectedCategory} />
                                <RenderAllItems items={items} shoppingList={shoppingList} setShoppingList={setShoppingList} />
                            </ScrollView>
                        </View>
                        }
                    </View>
                </Animated.View>
            </View>
        </LinearGradient>
    );
};
