import { InventoryItem } from "@/app/(tabs)/items/ItemSlice";
import { useAppSelector } from "@/app/store/hooks";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dimensions, Keyboard, NativeSyntheticEvent, TextInput, TextInputChangeEventData, View } from "react-native";
import { styles } from "./Theme";
import { ScrollView, SecondaryView, TextSecondary, TouchableOpacity } from "../Themed";

type SearchWithContextMenuProps = {
    placeholder: string;
    searchContext: InventoryItem[];
    onTouchParentContainer: boolean;
    setSelectedItem: Dispatch<SetStateAction<InventoryItem>>;
    displayElement?: Dispatch<SetStateAction<boolean>>;
}

export default function SearchWithContextMenu ({ displayElement, onTouchParentContainer, placeholder, searchContext, setSelectedItem }: SearchWithContextMenuProps) {
    const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);
    const [value, onChangeText] = useState<string>('');
    const theme = useAppSelector(state => state.theme.colors);

    useEffect(() => {
        const keyboardShown = Keyboard.addListener('keyboardDidShow', () => {
            displayElement && displayElement(true);
            console.log('shown')
        })
        const keyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
            displayElement && displayElement(false);
            console.log('hidden')
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
        console.log(value);
        if (value === '') {
            setSearchResults([]);
        } else {
            const filteredResults = searchContext.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            setSearchResults([...filteredResults]);
        }
    }, [value])

    const handlePress = (result: InventoryItem) => {
        setSelectedItem(result);
        onChangeText('');
    }

    return (
        <View style={[styles.justifiedCenter, { width: '100%', marginTop: 20, marginBottom: 20 }]}>
            <View style={[{ backgroundColor: theme.background2, elevation: 5, borderRadius: 10, width: '90%', padding: 10 }]}>
                <TextInput
                    style={[{}]}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => onChangeText(e.nativeEvent.text)}
                    placeholderTextColor={theme.textSecondary}
                    
                />
            </View>
            {searchResults.length > 0 && 
                <ScrollView keyboardShouldPersistTaps='always' style={[{ height: 'auto', maxHeight: Dimensions.get('window').height / 3, width: '80%', overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, elevation: 5 }]}>
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