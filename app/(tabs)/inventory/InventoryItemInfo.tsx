import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/components/util/Theme";
import { useNavigation } from "expo-router";
import { InventoryStackParamList } from "@/constants/Types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import BackButton from "@/components/util/BackButton";
import useToggleHeader from "../hooks/useToggleHeader";

type InventoryItemInfoRouteProp = RouteProp<InventoryStackParamList, 'InventoryItemInfo'>;

export default function InventoryItemInfo() {
  const route = useRoute<InventoryItemInfoRouteProp>();
    const navigation = useNavigation<NavigationProp<InventoryStackParamList, 'InventoryMain'>>();

    useToggleHeader(false);

    const { searchValue } = route.params;
    return(
    <View style={styles.container}>
      <View style={{
          height: 300,
          backgroundColor: 'black',
        }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              More widgets or cards to add here
            </Text>
        </View>
        <TouchableOpacity
            onPress={() => {
                console.log('Item clicked');
                navigation.navigate('InventoryMain');
            }}
        >
                <Text style={styles.title}>{searchValue}</Text>
        </TouchableOpacity>
        <BackButton />
    </View>
    );
};
