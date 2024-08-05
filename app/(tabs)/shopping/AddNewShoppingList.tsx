import { useAppSelector } from "@/app/store/hooks";
import { TouchableOpacity } from "@/components/Themed";
import { ShoppingStackParamList } from "@/constants/Types";
import { FontAwesome5 } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function AddNewShoppingList() {
    const theme = useAppSelector(state => state.theme);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList, 'ShoppingMain'>>();

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('CreateShoppingList')}
        style={{
            backgroundColor: 'transparent'
        }}
    >
        <FontAwesome5 
            name="plus" 
            size={24} 
            color={theme.colors.iconColor2}
        />
    </TouchableOpacity>
  )
}