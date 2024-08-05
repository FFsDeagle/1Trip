import { LinearGradient, TextPrimary, TextSecondary } from "@/components/Themed";
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import React from "react";

export default function AddItem() {
  return (
    <LinearGradient 
        style={[styles.container, {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }]}
        colors={[]}
    >
            <TextPrimary style={styles.title}>Add Item</TextPrimary>
            <TextSecondary style={styles.subtitle}>Add a new item to your inventory</TextSecondary>
        <BackButton />
    </LinearGradient>
  )
};
