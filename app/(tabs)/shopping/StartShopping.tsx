import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import MultiButtonContextMenu from "@/components/widgets/misc/MultiButtonContextMenu";
import { ShoppingStackParamList } from "@/constants/Types";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, RouteProp, useNavigation } from "@react-navigation/native";
import { FlatList, TouchableOpacity, View } from "react-native";
import { AddListToInventory, InventoryItem } from "../inventory/InventorySlice";

type ViewShoppingListProps = {
    route: RouteProp<ShoppingStackParamList, 'StartShopping'>;
};

export default function StartShopping({ route }: ViewShoppingListProps){
    const { list } = route.params;
    const theme = useAppSelector(state => state.theme);
    const items = useAppSelector(state => state.inventory.inventoryItems);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        dispatch(AddListToInventory(list.items as InventoryItem[]));
        navigation.navigate('ShoppingMain');
    }

    return (
        <SecondaryView style={styles.container}>
            <FlatList
                data={list.items}
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => 
                    (
                        <View
                            style={styles.justifiedApart}
                        >
                            <TextSecondary style={styles.listItem}>
                                {item.name}
                            </TextSecondary>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}>
                                <TouchableOpacity style={[styles.justified, { marginRight: 10, marginLeft: 5 }]}>
                                    <FontAwesome5 name='check' size={24} color={theme.colors.iconColor} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            />
        <MultiButtonContextMenu 
            // Add buttons to the context menu
            buttons={[
            <TouchableOpacity 
                onPress={handleSubmit}
            >
                <FontAwesome5 name="cash-register" size={24} color={theme.colors.iconColor} />
            </TouchableOpacity>
            ]} 
        />
        </SecondaryView>
    )
}