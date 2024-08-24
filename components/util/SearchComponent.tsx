import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LinearGradient, TextSecondary, ScrollView } from "../Themed";
import SearchWithContextMenu from "./SearchWithContextMenu";
import { InventoryItem } from "@/app/(tabs)/inventory/InventorySlice";
import { Dimensions, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./Theme";
import { useAppSelector } from "@/app/store/hooks";
import { InventoryStackParamList, RootStackParamList } from "@/constants/types";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import BackButton from "./BackButton";

type RouteParams = { route: { params: { placeholder: string } }};

export default function SearchComponent({ route }: RouteParams) {
    const items = useAppSelector(styles => styles.inventory.inventoryItems);
    const { placeholder } = route.params;
    const navigation = useNavigation<NavigationProp<InventoryStackParamList>>();
    const theme = useAppSelector(state => state.theme.colors);
    const [value, onChangeText] = useState<string>('');
    const [searchResults, setSearchResults] = useState<InventoryItem[]>([]);

    useEffect(() => {
        search();
    }, [value])

    const search = () => {
        if (value === '') {
            setSearchResults([]);
        } else {
            const filteredResults = items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
            setSearchResults([...filteredResults]);
        }
    }

    const handlePress = (result: InventoryItem) => {
        onChangeText('');
        navigation.navigate('InventoryItemInfo', { searchValue: result.name });
    }

    return (
        <LinearGradient style={styles.container} colors={[]}>
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
                    <ScrollView keyboardShouldPersistTaps='always' style={[{ height: 'auto', maxHeight: Dimensions.get('window').height / 3, width: '80%', overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}>
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