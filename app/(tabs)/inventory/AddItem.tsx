import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text } from "react-native";

export default function AddItem() {
  return (
    <LinearGradient 
        style={[styles.container, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }]}
        colors={['#184E68', '#57CA85']}
    >
            <Text style={styles.title}>Add Item</Text>
            <Text style={styles.subtitle}>Add a new item to your inventory</Text>
        <BackButton />
    </LinearGradient>
  )
};
