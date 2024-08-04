import { styles } from "@/components/util/Theme";
import InventoryCategoryWidget from "@/components/widgets/inventory/InventoryCategoryWidget";
import AddInventoryItemButton from "@/app/(tabs)/inventory/AddInventoryItemButton";
import { SecondaryView, TextSecondary } from "@/components/Themed";

export default function InventoryMain() {
    return(
    <SecondaryView style={styles.container}>
      <InventoryCategoryWidget />
      <TextSecondary
        style={{
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        More widgets or cards to add here
      </TextSecondary>
      <AddInventoryItemButton />
    </SecondaryView>
    );
};