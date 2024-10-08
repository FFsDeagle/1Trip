import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, FontAwesome6, MaterialIcons, Fontisto } from "@expo/vector-icons";
import { styles } from "@/components/util/Theme";
import { ItemsStackParamList, WidgetGridItemProps } from "@/constants/types";
import { useNavigation, useRouter } from "expo-router";
import { LinearGradient, TextSecondary } from "@/components/Themed";
import { useAppSelector } from "@/app/store/hooks";
import { NavigationProp } from "@react-navigation/native";

export default function ItemsCategoryWidget() {
    const theme = useAppSelector(state => state.theme.colors);
    const { categories } = useAppSelector(state => state.item);
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
    return (
        <LinearGradient 
          style={styles.gridContainer} 
          colors={[]}        
        >
          <View style={[styles.flexRow, styles.justifiedStart]}>
            <View style={[styles.flexRow, styles.justifiedApart, styles.justifiedApart]}>
                <TextSecondary style={[styles.header2, {color: theme.textPrimary}]}>
                    Categories
                </TextSecondary>
              <TouchableOpacity onPress={() => navigation.navigate("ViewCategories")} style={[styles.justified ,{ right: 15 }]}>
                    <AntDesign name="setting" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
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
              <TextSecondary style={styles.subtitle}>
                {category.name}
              </TextSecondary>
            </TouchableOpacity>
          ))}
        </LinearGradient>
    )
}
