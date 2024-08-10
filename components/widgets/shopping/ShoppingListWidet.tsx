import { useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import { ShoppingStackParamList, ViewShoppingListTypeProps } from "@/constants/Types";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";

export default function ShoppingListWidget() {
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const theme = useAppSelector(state => state.theme.colors);

    const handlePress = (listType: ViewShoppingListTypeProps) => {
        console.log('handlePress', listType);
        navigation.navigate('ViewShoppingListType', { list: listType });
    }

    return (
        <SecondaryView style={styles.justifiedCenter}>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'savedLists', title: 'Saved Lists'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3 }
                ]}
            >
                <TextSecondary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    Saved Lists
                </TextSecondary>
                <FontAwesome5 name="save" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'generatedLists', title: 'Generated Lists'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3 }
                    ]}
            >
                    <MaterialIcons name="auto-awesome-motion" size={24} color="black" />
                <TextSecondary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    Generated Shopping Lists
                </TextSecondary>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'history', title: 'History'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3 }
                ]}
            >
                <TextSecondary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    History
                </TextSecondary>
                <FontAwesome5 name="history" size={24} color="black" />
            </TouchableOpacity>
        </SecondaryView>
    )
}