import { InventoryItem } from "@/app/(tabs)/items/ItemSlice";
import { useAppSelector } from "@/app/store/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView } from 'react-native';
import { Dimensions, Keyboard, TextInput, View } from "react-native";
import { styles } from "./Theme";
import { TextSecondary } from "../Themed";
import { AntDesign } from "@expo/vector-icons";

type SearchWithContextMenuProps = {
    placeholder: string;
    searchContext: InventoryItem[];
    onTouchParentContainer?: boolean;
    setSelectedItem: Dispatch<SetStateAction<InventoryItem>>;
    displayElement?: Dispatch<SetStateAction<boolean>>;
    popUpShown: boolean;
}

type Category = {
    name: string;
    isSelected: boolean;
}

export default function SearchWithContextMenu ({ popUpShown, displayElement, onTouchParentContainer, placeholder, searchContext, setSelectedItem }: SearchWithContextMenuProps) {
    const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
    const [value, onChangeText] = useState<string>('');
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
    const theme = useAppSelector(state => state.theme.colors);

    useEffect(() => {
        const keyboardShown = Keyboard.addListener('keyboardDidShow', () => {
            displayElement && displayElement(true);
            setKeyboardShown(true);
        })
        const keyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
            displayElement && displayElement(false);
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
        setSearchResults([]);
    }, [onTouchParentContainer])

    useEffect(() => {
        if (!keyboardShown || popUpShown) return;
        search();
    }, [value, displayCategory, keyboardShown])

    const search = () => {
        if (displayCategory.name !== ''){
            searchCategoryResults();
            return;
        }
        if (!keyboardShown) return;
        if (displayCategory.name === '' && value === '') {
            setSearchResults([...searchContext]);
        } else {
            const filteredResults = searchContext.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            setSearchResults([...filteredResults]);
        }
    }

    const searchCategoryResults = () => {
        const filteredResults = searchContext.filter(item => item.category.toLowerCase() === displayCategory.name.toLowerCase() && item.name.toLowerCase().includes(value.toLowerCase()));
        setSearchResults([...filteredResults]);
    }

    const handlePress = (result: InventoryItem) => {
        setSelectedItem(result);
        onChangeText('');
    }

    const displayCategorizedResults = (selectedCategory: Category) => {
        setDisplayCategory(selectedCategory);
        const filteredResults = searchContext.filter(item => item.category.toLowerCase() === selectedCategory.name.toLowerCase());
        setSearchResults([...filteredResults]);
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

    return (
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
            {searchResults.length > 0 && 
                <ScrollView keyboardShouldPersistTaps='always' style={[{ backgroundColor: theme.background2 ,height: 'auto', maxHeight: Dimensions.get('window').height / 3, width: '90%', overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
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
    )
}