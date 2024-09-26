import { LinearGradient, PrimaryView, ScrollView, TextSecondary } from "@/components/Themed";
import { Dimensions, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { styles } from "@/components/util/Theme";
import { ReactElement, useEffect, useRef, useState } from "react";
import { FavouriteList, getFavouriteList, InventoryItem } from "../../items/ItemSlice";
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
import { DeleteList, SaveShoppingList, UpdateShoppingList } from "../ShoppingSlice";
import { ShoppingList } from "../ShoppingSlice";
import AnimatedModalWithInput from "@/components/animations/AnimatedModalWithInput";
import LoadingIndicator from "@/components/animations/LoadingIndicator";
import SearchWithContextMenu from "@/components/util/SearchWithContextMenu";

type ShoppingListNavigationProps = {
    route: RouteParams;
}

type RouteParams = { params: {name: string, list: ShoppingList, listType: string} };

export type CategorySelection = {
    name: string;
    items: InventoryItem[];
};

export default function CreateShoppingList({ route }: ShoppingListNavigationProps) {
    const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
    const [menu, setMenu] = useState<string>('');
    const [favList, setFavList] = useState<InventoryItem[]>([] as InventoryItem[]);
    const [categoryItems, setCategoryItems] = useState<CategorySelection[]>([]);
    const [allItems, setAllItems] = useState<InventoryItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
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
    const [searchResultsItem, setSearchResultsItem] = useState<InventoryItem>({} as InventoryItem);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const favoriteLists = useAppSelector(state => state.item.favouriteLists);
    const { id } = useAppSelector(state => state.login.loginResponse);

    useEffect(() => {
        dispatch(getFavouriteList(id));
    },[])

    // useEffect(() => {
    //     setFavItems(favoriteLists);
    // },[favoriteLists])

    useEffect(() => {
        // Sort shopping list by category
        setShoppingList(shoppingList.sort((a, b) => a.category.localeCompare(b.category)));
    },[shoppingList])

    // If list is loaded from the edit option
    useEffect(() => {
        if (route.params && route.params.list !== null) {
            const list = route.params.list as ShoppingList;
            setShoppingList(list.items as ShoppingListItem[]);
            setName(list.name);
            setIsEditing(true);
        }
    }, [])

    useEffect(() => {
        addOrDeleteList();
    }, [listSaved])

    const addOrDeleteList = async () => {
        if (listSaved){
            const listToSave: ShoppingList = {
                name: name,
                items: shoppingList
            }
            if (isEditing){
                // If list is empty delete it
                if (shoppingList && shoppingList.length === 0){
                    await dispatch(DeleteList({ id, list: listToSave}));
                    navigation.navigate('ShoppingMain');
                }else {
                    // Update the list
                    await dispatch(UpdateShoppingList({ id, list: listToSave}));
                    navigation.navigate('ShoppingMain');
                }
            } else {
                console.log('Saving list', listToSave);
                await dispatch(SaveShoppingList({ id, list: listToSave}));
                navigation.navigate('ShoppingMain');
            }
        }
    }

    // For added search items
    useEffect(() => {
        if (searchResultsItem && Object.keys(searchResultsItem).length === 0) return;
        const itemToAdd: ShoppingListItem = {
            _id: searchResultsItem._id,
            name: searchResultsItem.name,
            category: searchResultsItem.category,
            description: searchResultsItem.description,
            quantity: searchResultsItem.uom,
            lastAddedDate: new Date(Date.now()).toISOString(),
            isPastExpiry: false
        }
        setSearchResultsItem({} as InventoryItem);
        const itemAlreadyExists = shoppingList.find(item => item._id === itemToAdd._id);
        if (itemAlreadyExists !== undefined) {
            setShoppingList(shoppingList.map(item => {
                if (item._id === itemToAdd._id) {
                    item.quantity += itemToAdd.quantity;
                }
                return item;
            }));
            return;
        }
        setShoppingList([...shoppingList, itemToAdd]);
    },[searchResultsItem])

    useEffect(() => {
        initializeDraggables();
    },[])

    const initializeDraggables = async () => {
        if (items && items.length > 0) return;
        setLoading(true);
        await dispatch(getItemList(id)).then(() => {
            setLoading(false);
        });
    }

    const checkBounds = (dropPosition: { x: number, y: number }, callBack: (isWithinBounds: boolean) => void) => {
        topPaneRef.current?.measure((x, y, width, height, pageX, pageY) => {
            const withinXBounds = dropPosition.x >= pageX && dropPosition.x <= pageX + width;
            const withinYBounds = dropPosition.y >= pageY && dropPosition.y <= pageY + height;
            callBack(withinXBounds && withinYBounds);   
        });
        return false;
    }

    const handleDrop = async (id: string, dropPosition: { x: number, y: number }) => {
        checkBounds(dropPosition, (iswithinBounds) => {
            iswithinBounds && addKeyItemsToList(id);
        })
    };

    const addKeyItemsToList = (id: string) => {
        setShoppingList((prevShoppingList) => {
            // Map over the previous shopping list to update existing items
            const selectedFavList = favoriteLists.find(list => list.id === id)?.items.map(item => { return item; });
            if (selectedFavList === undefined) return [...prevShoppingList];
            const updatedShoppingList = prevShoppingList.map(item => {
                const foundItem = selectedFavList.find(c => c._id === item._id);
                if (foundItem) {
                    console.log('Updating list', foundItem);
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

            const itemsToAdd = selectedFavList.filter(item => !prevShoppingList.find(c => c._id === item._id)).map(item => {
                return {
                    _id: item._id,
                    name: item.name,
                    category: item.category,
                    description: item.description,
                    quantity: item.uom,
                    lastAddedDate: new Date(Date.now()).toISOString(),
                    isPastExpiry: false
                };
            });
            return [...updatedShoppingList, ...itemsToAdd];
        });
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

    const saveList = () => {
        // Display Modal & prompt to set a name
        if (isEditing) {
            setListSaved(true);
            return;
        }
        if (shoppingList && shoppingList.length === 0){
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
                <SearchWithContextMenu popUpShown={showNameModal} placeholder="Search for items" searchContext={items} setSelectedItem={setSearchResultsItem} displayElement={setKeyboardShown} />
                {/* Center Scroll View for Shopping List */}
                <Animated.ScrollView style={{ height: centreContainerHeight }}>
                    <Animated.View ref={topPaneRef} style={{height: centreContainerHeight}}>
                        {
                            shoppingList && shoppingList.length === 0 ?
                            <TextSecondary style={[styles.title, { textAlign: 'center', height: initialHeight, marginTop: 10 }]}>
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
                    <View style={[styles.flexRow, styles.justifiedCenter, { width: '100%', height: menu === '' ? 'auto' : '100%' }]}>
                        {
                        favoriteLists && favoriteLists.map((item) => (
                            <DraggableItem
                                setItemDragged={setItemDragged}
                                key={item.id}
                                item={{ name: item.name, key: item.id, iconComponent: <FontAwesome5 name="square" color={theme.iconColor} size={24} /> }}
                                style={[{ zIndex: 100 }]}
                                setMenu={setMenu}
                                onDrop={handleDrop}
                                onDrag={handleDrag}
                            />
                        ))
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
                        <FontAwesome5 name={"save"} size={24} color={theme.iconColor} />
                    </TouchableOpacity>,
                ]} 
            />
        </LinearGradient>
    );
};