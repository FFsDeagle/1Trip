import { View, TouchableOpacity as TouchableOpacityOrig } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { styles } from "@/components/util/Theme";
import { ItemsStackParamList } from "@/constants/types";
import { useNavigation } from "expo-router";
import { TextPrimary, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { useAppSelector } from "@/app/store/hooks";
import { NavigationProp } from "@react-navigation/native";

export default function ItemsCategoryWidget() {
    const theme = useAppSelector(state => state.theme.colors);
    const { categories, items } = useAppSelector(state => state.item);
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
    return (
        <View
          style={styles.gridContainer}
        >
          <View style={[styles.flexRow, styles.justifiedStart]}>
            <View style={[styles.flexRow, styles.justifiedApart, styles.justifiedApart]}>
                <TextSecondary style={[styles.header2, {color: theme.textPrimary}]}>
                    Categories
                </TextSecondary>
              <TouchableOpacityOrig onPress={() => navigation.navigate("ViewCategories")} style={[styles.justified ,{ right: 15 }]}>
                    <AntDesign name="setting" size={24} color={theme.iconColor} />
                </TouchableOpacityOrig>
            </View>
          </View>
          {/* Display a list of Categories? */}
          {categories.length > 0 && categories.slice(0, 5).map(category => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('UpdateCategories', { category })}
              key={category._id} style={[
              styles.listItem, 
              styles.flexRow, 
              styles.justifiedApart
            ]}>
              <TextPrimary style={styles.subtitle}>
                {category.name}
              </TextPrimary>
            </TouchableOpacity>
          ))}
          <View style={[{ marginTop: 15 }, styles.flexRow, styles.justifiedStart]}>
            <View style={[styles.flexRow, styles.justifiedApart, styles.justifiedApart]}>
                <TextSecondary style={[styles.header2, {color: theme.textPrimary}]}>
                    Recently added items
                </TextSecondary>
            </View>
          </View>
          {items.length > 0 && items.slice(-5).map(item => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ItemInfo', { searchValue: item.name })}
              key={item._id}
              style={[styles.listItem, styles.flexRow, styles.justifiedApart]}
            >
              <TextSecondary style={styles.subtitle}>
                {item.name}
              </TextSecondary>
            </TouchableOpacity>
          ))}
        </View>
    )
}
