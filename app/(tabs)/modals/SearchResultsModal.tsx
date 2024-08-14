import { TouchableOpacity, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { InventoryStackParamList } from "@/constants/Types";
import { NavigationProp } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect } from "react";
import { GetInventoryItemsByCategory } from "../inventory/InventorySlice";
import { SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { truncateText } from "@/components/util/truncateText";

export default function SearchResultsModal() {
  const navigation = useNavigation<NavigationProp<InventoryStackParamList>>();
    const params = useLocalSearchParams();
    const dispatch = useAppDispatch();
    const { title } = params;
    const itemsList = useAppSelector(state => state.inventory.displayedCategory)

    useEffect(() => {
        dispatch(GetInventoryItemsByCategory(title as string));
    }, []);

    if (itemsList && itemsList.length === 0) {
        return (
            <SecondaryView style={styles.container}>
                <TextPrimary style={styles.title}>No items found</TextPrimary>
            </SecondaryView>
        )
    }

    return (
        <View>
            <SecondaryView
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 10,
                }}
            >
                <View style={styles.flexRow}>
                    <TextPrimary style={styles.title}>Name</TextPrimary>
                    <TextPrimary style={[styles.title, { marginLeft: 20 }]}>Description</TextPrimary>
                </View>
                <TextPrimary style={styles.title}>Qty</TextPrimary>
            </SecondaryView>
            {itemsList && itemsList.map((item, index) => (
                <SecondaryView
                    key={index}
                    style={styles.listItem}
                >
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                        onPress={() => navigation.navigate('InventoryItemInfo', { searchValue: item.name })}
                    >
                        <View style={styles.flexRow}>
                            <TextPrimary style={styles.title}>{item.name}</TextPrimary>
                            <TextPrimary style={[styles.title, {marginLeft: 20}]}>{truncateText(item.description, 25)}</TextPrimary>
                        </View>
                        <TextPrimary style={styles.title}>{item.quantity}</TextPrimary>
                    </TouchableOpacity>
                </SecondaryView>
            ))}
        </View>
    )
}

