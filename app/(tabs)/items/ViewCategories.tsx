import { useAppSelector } from "@/app/store/hooks";
import { LinearGradient, TextSecondary } from "@/components/Themed";
import { TouchableOpacity } from 'react-native';
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { View } from "react-native";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { ItemsStackParamList } from "@/constants/types";
import { Categories } from "./ItemSlice";

export default function ViewCategories() {
    const categories = useAppSelector(state => state.item.categories);
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();

    const handleNavigation = (category: Categories) => {
        navigation.navigate("UpdateCategories", { category });
    }

  return (
    <LinearGradient style={styles.container} colors={[]}>
        <TextSecondary style={[styles.getStartedText, { marginTop: 10 }]}>Configure Categories</TextSecondary>
        <View style={[styles.justifiedStart]}>
            {categories.map((category, index) => (
                <TouchableOpacity onPress={() => handleNavigation(category)} key={index} style={[styles.listItem]}>
                    <TextSecondary style={styles.subtitle}>{category.name}</TextSecondary>
                </TouchableOpacity>
            ))}
        </View>
        <BackButton />
    </LinearGradient>
  )
};
