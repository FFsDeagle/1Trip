import { Keyboard, TouchableOpacity, View } from "react-native";
import { useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { InventoryStackParamList } from "@/constants/Types";
import useToggleHeader from "../hooks/useToggleHeader";
import { useEffect, useState } from "react";

export default function AddInventoryItemButton() {
    const navigation = useNavigation<NavigationProp<InventoryStackParamList, 'InventoryMain'>>();
    // Re-usable back button component which appears on the bottom right of the screen
    // useNavigation will get the navigation object from the Router, the purpose of this is to get the current screen from the Navigation Stack
    // In this case we are using the navigation object to go back to the previous screen

    // Disable the add button when the keyboard is visible
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useToggleHeader(true);
  
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
  
    if (isKeyboardVisible) {
      return null;
    }

  return (
    <View style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 100,
        // shadow
    }}>
        <TouchableOpacity 
        style={{
            backgroundColor: '#0D2327',
            padding: 10,
            borderRadius: 50,
            display: 'flex',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
            borderColor: '#5D6C6F',
            borderWidth: 2, 
        }} 
    onPress={() => {
        navigation.navigate('AddItem');
    }}
        >
            <FontAwesome5 name="plus" size={24} color="white" />
        </TouchableOpacity>
    </View>
  )
};
