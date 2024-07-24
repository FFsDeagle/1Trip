import React from "react";
import { Text, TextInput, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchBarWidget() {
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C8E5EE',
        padding: 10,
        height: 50,
    }}>
        <TextInput placeholder="Search"><FontAwesome name="search"/></TextInput>
    </View>
  )
};
