import { View, Text } from "react-native";
import { styles } from "@/components/util/Theme";
import InventoryCategoryWidget from "@/components/widgets/inventory/InventoryCategoryWidget";
import { useNavigation } from "expo-router";

export default function InventoryMain() {
    const navigation = useNavigation();
    return(
    <View style={styles.container}>
      <InventoryCategoryWidget />
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
    </View>
    );
};