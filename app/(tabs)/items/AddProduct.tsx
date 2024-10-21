import { useFadeIn } from "@/components/animations/useFadeIn";
import { LinearGradient, TextPrimary, TextSecondary } from "@/components/Themed";
import { TouchableOpacity } from 'react-native';
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Animated } from "react-native";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { ItemsStackParamList } from "@/constants/types";
import { useAppSelector } from "@/app/store/hooks";

export default function AddProduct() {
  const { opacity, fadeIn } = useFadeIn(250, 150);
  const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
  const { colors } = useAppSelector(state => state.theme);

  useEffect(() => {
    fadeIn();
  },[])
  return (
    <LinearGradient 
        style={[styles.container, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }]}
        colors={[]}
    >
        <Animated.View style={[styles.container, styles.justified, { opacity }]}>
            <TouchableOpacity onPress={() => navigation.navigate('AddNewProduct')} style={[styles.justified, { padding: 10, margin: 10 }]}>
              <FontAwesome name="square" size={48} color={colors.iconColor} />
                <TextPrimary style={styles.title}>
                  Add Product
                </TextPrimary>
            </TouchableOpacity>
            <TextPrimary style={styles.title}>Or</TextPrimary>
            <TouchableOpacity onPress={() => navigation.navigate('AddNewCategory')} style={[styles.justified, { padding: 10, margin: 10 }]}>
              <MaterialIcons name="category" size={48} color={colors.iconColor} />
                <TextPrimary style={styles.title}>
                  Add Category
                </TextPrimary>
            </TouchableOpacity>
        </Animated.View>
        <BackButton />
    </LinearGradient>
  )
};
