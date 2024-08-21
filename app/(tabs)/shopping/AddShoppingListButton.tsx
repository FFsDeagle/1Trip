import { Keyboard, View } from "react-native";
import { TouchableOpacity } from "@/components/Themed";
import { useNavigation } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { ShoppingStackParamList } from "@/constants/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/store/hooks";

export default function AddShoppingListButton() {
  const navigation = useNavigation<NavigationProp<ShoppingStackParamList, 'ShoppingMain'>>();
    // Re-usable back button component which appears on the bottom right of the screen
    // useNavigation will get the navigation object from the Router, the purpose of this is to get the current screen from the Navigation Stack
    // In this case we are using the navigation object to go back to the previous screen
    const theme = useAppSelector(state => state.theme);

    // Disable the add button when the keyboard is visible
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  
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
            padding: 10,
            borderRadius: 50,
            display: 'flex',
            height: 50,
            width: 50,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
        }} 
          onPress={() => {
              navigation.navigate('CreateShoppingList');
          }}
        >
            <FontAwesome5 name="plus" size={24} color={theme.colors.iconColor} />
        </TouchableOpacity>
    </View>
  )
};
