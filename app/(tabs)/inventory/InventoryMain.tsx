import { View, Text } from "react-native";
import { styles } from "@/components/util/Theme";
import InventoryCategoryWidget from "@/components/widgets/inventory/InventoryCategoryWidget";
import AddInventoryItemButton from "@/app/(tabs)/inventory/AddInventoryItemButton";

export default function InventoryMain() {
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
        <AddInventoryItemButton />
    </View>
    );
};