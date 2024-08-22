import { LinearGradient, PrimaryView, ScrollView, TextSecondary } from "@/components/Themed";
import { Dimensions, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
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
import MultiButtonContextMenu from "@/components/widgets/misc/MultiButtonContextMenu";
import { useNavigation } from "expo-router";
import { ShoppingStackParamList } from "@/constants/types";
import { NavigationProp } from "@react-navigation/native";
import AnimatedModal from "@/components/animations/AnimatedModal";
import { SaveShoppingList } from "../ShoppingSlice";
import { ShoppingList } from "../ShoppingSlice";
import AnimatedModalWithInput from "@/components/animations/AnimatedModalWithInput";
import LoadingIndicator from "@/components/animations/LoadingIndicator";
import SearchWithContextMenu from "@/components/util/SearchWithContextMenu";

export type CategorySelection = {
    name: string;
    items: InventoryItem[];
};

export default function CreateShoppingList() {
    const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
    const [menu, setMenu] = useState<string>('');
    const [favList, setFavList] = useState<InventoryItem[]>([] as InventoryItem[]);
    const [categoryItems, setCategoryItems] = useState<CategorySelection[]>([]);
    const [allItems, setAllItems] = useState<InventoryItem[]>([]);
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
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showNameModal, setShowNameModal] = useState<boolean>(false);
    const [listSaved, setListSaved] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [contextMenu, setContextMenu] = useState<boolean>(false);
    const [parentContainerTouched, setParentContainerTouched] = useState<boolean>(false);
    const [searchResultsItem, setSearchResultsItem] = useState<InventoryItem>({} as InventoryItem);

    const menuSelection = [
        { key: 'Favorites', iconComponent: <FontAwesome5 name="star" color={theme.iconColor} size={24} /> },
        { key: 'Categories', iconComponent: <MaterialIcons name="category" color={theme.iconColor} size={24} /> },
        { key: 'All', iconComponent: <FontAwesome5 name="clipboard-list" color={theme.iconColor} size={24} /> },
    ];

    useEffect(() => {
        if (listSaved){
            const listToSave: ShoppingList = {
                name: name,
                items: shoppingList
            }
            dispatch(SaveShoppingList(listToSave));
            navigation.navigate('ShoppingMain');
        }
    }, [listSaved])

    // For added search items
    useEffect(() => {
        if (searchResultsItem && Object.keys(searchResultsItem).length === 0) return;
        const itemToAdd: ShoppingListItem = {
            id: searchResultsItem.id,
            name: searchResultsItem.name,
            category: searchResultsItem.category,
            description: searchResultsItem.description,
            quantity: searchResultsItem.uom,
            lastAddedDate: new Date(Date.now()).toISOString(),
            isPastExpiry: false
        }
        setShoppingList([...shoppingList, itemToAdd]);
    },[searchResultsItem])

    useEffect(() => {
        initializeDraggables();
    },[])

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

    const initializeDraggables = async () => {
        if (items.length > 0) return;
        setLoading(true);
        await dispatch(getItemList()).then(() => {
            filterFavorites();
            setLoading(false);
        });
    }

    const filterFavorites = () => {
        const filteredItems = items.filter(item => item.isFavorite === true);
        setFavList([...filteredItems]);
    }

    const filterCategories = () => {
        const categories = items.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index);
        console.log(categories);
        setCategoryItems(categories.map(category => {
            return { name: category, items: items.filter(item => item.category === category) };
        }));
    }

    const filterAll = () => {
        setAllItems(items);
    }

    // Get items based on the selection
    const getItemsBySelection = () => {
        setFavList([]);
        setCategoryItems([]);
        setAllItems([]);
        // Clear lists
        switch(menu){
            case 'Favorites':
                filterFavorites();
                openContainer();
                break;
            case 'Categories':
                filterCategories();
                openContainer();
                break;
            case 'All':
                filterAll();
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
        switch(key){
            case 'Favorites':
                setShoppingList((prevShoppingList) => {
                    // Map over the previous shopping list to update existing items
                    const updatedShoppingList = prevShoppingList.map(item => {
                        const foundItem = items.find(c => c.id === item.id);
                        if (foundItem && foundItem.isFavorite) {
                            return {
                                ...item,
                                quantity: item.quantity + (foundItem.uom ?? 0),
                                lastAddedDate: new Date(Date.now()).toISOString(),
                                isPastExpiry: false
                            };
                        }
                        return item;
                    });
            
                    // Add new items that are favorites and not already in the list
                    const newItems = items
                        .filter(item => item.isFavorite && !prevShoppingList.find(e => e.id === item.id))
                        .map(item => ({
                            id: item.id,
                            name: item.name,
                            category: item.category,
                            description: item.description,
                            quantity: item.uom,
                            lastAddedDate: new Date(Date.now()).toISOString(),
                            isPastExpiry: false
                        }));
                    return [...updatedShoppingList, ...newItems];
                });
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
                            lastAddedDate: new Date(Date.now()).toISOString(),
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
        setFavList([]);
        setCategoryItems([]);
        setSelectedCategoryItems([]);
        setAllItems([]);
        switch(menu){
            case 'Favorites':
                setMenu('');
                break;
            case 'Categories':
                setMenu('');
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

    const saveList = () => {
        // Display Modal & prompt to set a name
        if (shoppingList.length === 0){
            setShowModal(true);
        } else {
            setShowNameModal(true);
        }
    }

    if (loading) {
        return <LoadingIndicator displayText="Fetching your Inventory Items" />
    }

    return (
        <LinearGradient 
            style={[styles.container]}
            colors={[]}
        >
            {showModal && <AnimatedModal message="Add items to your list to proceed" setShowModal={setShowModal} showModal={showModal} />}
            {!showModal && showNameModal && <AnimatedModalWithInput name={name} setName={setName} message="Give your Shopping List a name" setListSaved={setListSaved} setShowModal={setShowNameModal} showModal={showNameModal} />}
            <View 
                pointerEvents={showModal ? "none" : "auto"}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    height: '100%',
                    width: '100%',
                }}
            >
                {/* Top Pane for Displaying Headers */}
                <SearchWithContextMenu placeholder="Search for items" searchContext={items} onTouchParentContainer={parentContainerTouched} setSelectedItem={setSearchResultsItem} displayElement={setKeyboardShown} />
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
                {!showNameModal && !keyboardShown && <Animated.View style={[menu === '' ? styles.justified : styles.justifiedStart, { width: '100%', height: heightAnim, backgroundColor: theme.primary }]}>
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
                                <RenderAllItems items={allItems} shoppingList={shoppingList} setShoppingList={setShoppingList} />
                            </ScrollView>
                        </View>
                        }
                    </View>
                </Animated.View>}
            </View>
            <MultiButtonContextMenu 
                buttons={[
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                    >
                        <FontAwesome5 name="arrow-left" size={24} color={theme.iconColor} />
                    </TouchableOpacity>,
                    <TouchableOpacity 
                        onPress={saveList}
                    >
                        <FontAwesome5 name="save" size={24} color={theme.iconColor} />
                    </TouchableOpacity>,
                ]} 
            />
        </LinearGradient>
    );
};