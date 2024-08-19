import { useAppSelector } from "@/app/store/hooks";
import { ScrollView, SecondaryView, TextPrimary, TouchableOpacity } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import { ShoppingStackParamList, ViewShoppingListTypeProps } from "@/constants/Types";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { View } from "react-native";

export default function ShoppingListWidget() {
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const theme = useAppSelector(state => state.theme.colors);

    const handlePress = (listType: ViewShoppingListTypeProps) => {
        navigation.navigate('ViewShoppingListType', { list: listType });
    }

    return (
        <ScrollView contentContainerStyle={styles.justifiedCenter}>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'savedLists', title: 'Saved Lists'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3, elevation: 2 }
                ]}
            >
                <TextPrimary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    Saved Lists
                </TextPrimary>
                <FontAwesome5 name="save" size={24} color={theme.iconColor} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'incompleteLists', title: 'Incomplete Lists'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3, elevation: 2 }
                ]}
            >
                <FontAwesome5 name="save" size={24} color={theme.iconColor} />
                <TextPrimary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    Incomplete Lists
                </TextPrimary>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'generatedLists', title: 'Generated Lists'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3, elevation: 2 }
                    ]}
            >
                <TextPrimary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    Generated Shopping Lists
                </TextPrimary>
                <MaterialIcons name="auto-awesome-motion" size={24} color={theme.iconColor} />
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={() => handlePress({ listType: 'history', title: 'History'})}
                style={[
                    styles.cardContainer, styles.justifiedApart, { padding: 50, backgroundColor: theme.background3, elevation: 2 }
                ]}
            >
                <FontAwesome5 name="history" size={24} color={theme.iconColor} />
                <TextPrimary style={[styles.title, { fontSize: 18, fontWeight: 'bold' }]}>
                    History
                </TextPrimary>
            </TouchableOpacity>
        </ScrollView>
    )
}