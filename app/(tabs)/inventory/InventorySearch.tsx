import { useEffect, useState } from "react";
import { LinearGradient, TextSecondary } from "../../../components/Themed";
import { Category } from "@/components/util/SearchWithContextMenu";
import { InventoryItem } from "@/app/(tabs)/inventory/InventorySlice";
import { Keyboard, TextInput, TouchableOpacity, ScrollView, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { useAppSelector } from "@/app/store/hooks";
import { InventoryStackParamList } from "@/constants/types";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import BackButton from "@/components/util/BackButton";
import { AntDesign } from "@expo/vector-icons";

type RouteParams = { route: { params: { placeholder: string } }};

export default function InventorySearch({ route }: RouteParams) {
    const items = useAppSelector(styles => styles.inventory.inventoryItems);
    const { placeholder } = route.params;
    const navigation = useNavigation<NavigationProp<InventoryStackParamList>>();
    const theme = useAppSelector(state => state.theme.colors);
    const [value, onChangeText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
    const [displayCategory, setDisplayCategory] = useState<Category>({ isSelected: false, name: '' });
    const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
    const [category, setCategory] = useState<Category[]>([
        {name: 'Fruit', isSelected: false },
        {name: 'Vegetable', isSelected: false },
        {name: 'Meat', isSelected: false },
        {name: 'Dairy', isSelected: false },
        {name: 'Bakery', isSelected: false },
        {name: 'Frozen', isSelected: false },
        {name: 'Canned', isSelected: false },
        {name: 'Spices', isSelected: false },
        {name: 'Sauces', isSelected: false },
        {name: 'Drinks', isSelected: false },
        {name: 'Snacks', isSelected: false },
        {name: 'Household', isSelected: false },
        {name: 'Personal Care', isSelected: false },
        {name: 'Misc', isSelected: false }
    ]);

    useEffect(() => {
        const keyboardShown = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardShown(true);
        })
        const keyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardShown(false);
            setSearchResults([]);
            onChangeText('');
        })

        return () => {
            keyboardShown.remove();
            keyboardHidden.remove();
        }
    },[])

    
    useEffect(() => {
        search();
    }, [value, displayCategory, keyboardShown])


    const search = () => {
        if (displayCategory.name !== ''){
            searchCategoryResults();
            return;
        }
        if (displayCategory.name === '' && value === '') {
            setSearchResults([...items]);
        } else {
            const filteredResults = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            setSearchResults([...filteredResults]);
        }
    }

    const searchCategoryResults = () => {
        const filteredResults = items.filter(item => item.category.toLowerCase() === displayCategory.name.toLowerCase() && item.name.toLowerCase().includes(value.toLowerCase()));
        setSearchResults([...filteredResults]);
    }

    const handlePress = (result: InventoryItem) => {
        onChangeText('');
        navigation.navigate('InventoryItemInfo', { searchValue: result.name });
    }

    const handleCategorySelect = (selectedCategory: Category) => {
        const updatedCategories = category.map(category =>
            category.name === selectedCategory.name
                ? { ...category, isSelected: true }
                : { ...category, isSelected: false }
        );
        setCategory(updatedCategories);
        displayCategorizedResults(selectedCategory);
    }

    const displayCategorizedResults = (selectedCategory: Category) => {
        setDisplayCategory(selectedCategory);
        const filteredResults = items.filter(item => item.category.toLowerCase() === selectedCategory.name.toLowerCase());
        setSearchResults([...filteredResults]);
    }

    return (
        <LinearGradient style={styles.container} colors={[]}>
            <View style={[styles.justifiedCenter, { width: '100%', marginTop: 20 }]}>
                <View style={[styles.justifiedApart, styles.justified, { backgroundColor: theme.background2, elevation: 5, borderRadius: 10, width: '90%', padding: 10 }]}>
                    <TextInput
                        style={[{ fontStyle: 'italic', width: '50%', left: 10 }]}
                        placeholder={placeholder}
                        value={value}
                        onPress={search}
                        onChange={e => onChangeText(e.nativeEvent.text)}
                        placeholderTextColor={theme.textSecondary}
                    />
                    <View style={[styles.flexRow, styles.flexEnd, { width:  '50%', right: 10 }]}>
                        <TextSecondary style={{textAlign: 'right'}}>
                            {displayCategory ? displayCategory.name : ''}
                        </TextSecondary>
                        {displayCategory?.name !== '' && <TouchableOpacity onPress={() => {
                            if (!keyboardShown) {
                                setSearchResults([]);
                            }
                            setDisplayCategory({ name: '', isSelected: false})
                            setCategory(category.map(category => ({ ...category, isSelected: false })));
                        }
                            } style={[styles.justified, { marginLeft: 10 }]}>
                            <AntDesign name="closecircle" size={20} color={theme.textPrimary} />
                        </TouchableOpacity>}
                    </View>
                </View>
                <ScrollView keyboardShouldPersistTaps="always" horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: '100%' }}>
                    {
                        category.map(category => {
                            return (
                                <TouchableOpacity
                                    onPress={() => handleCategorySelect(category)}
                                    key={category.name}
                                    style={[
                                        styles.flexRow,
                                        {
                                            width: 'auto',
                                            padding: 5,
                                            backgroundColor: category.isSelected ? theme.secondary : theme.background2,
                                            borderRadius: 10,
                                            margin: 5,
                                            elevation: 5
                                        }
                                    ]}
                                >
                                    <TextSecondary style={{ color: category.isSelected ? theme.primary : theme.textSecondary }}>
                                        {category.name}
                                    </TextSecondary>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            </View>
            <View>
                {searchResults && searchResults.length > 0 &&
                        <ScrollView keyboardShouldPersistTaps='always' style={[{ height: 'auto', width: '100%', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
                            {
                                searchResults.map(result => {
                                    return (
                                        <TouchableOpacity 
                                            onPress={() => handlePress(result)}
                                            key={result.id} style={[styles.flexRow, styles.listItem, styles.justifiedApart]}
                                        >
                                            <TextSecondary>
                                                {result.name}
                                            </TextSecondary>
                                            <TextSecondary style={{fontStyle: 'italic'}}>
                                                {result.category}
                                            </TextSecondary>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    }
            </View>
            <BackButton />
        </LinearGradient>
    )
}