import { styles } from "@/components/util/Theme";
import { useNavigation } from "expo-router";
import { InventoryStackParamList } from "@/constants/types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import BackButton from "@/components/util/BackButton";
import { SecondaryView, TextPrimary, TextSecondary, TouchableOpacity, TouchableOpacityItem } from "@/components/Themed";

type InventoryItemInfoRouteProp = RouteProp<InventoryStackParamList, 'InventoryItemInfo'>;

type InventoryItemInfoProps = {
    route: {
        params: {
            searchValue: string;
        };
    };
};

export default function InventoryItemInfo({ route }: InventoryItemInfoProps) {
    const navigation = useNavigation<NavigationProp<InventoryStackParamList, 'InventoryMain'>>();

    const { searchValue } = route.params;
    return(
    <SecondaryView style={styles.container}>
      <TextPrimary
        style={{
          textAlign: 'center',
          marginTop: 20,
          fontSize: 20,
        }}
      >
        Inventory Item info
      </TextPrimary>
        <TouchableOpacityItem
            onPress={() => {
                console.log('Item clicked');
                navigation.navigate('InventoryMain');
            }}
        >
          <TextSecondary style={styles.title}>{searchValue}</TextSecondary>
        </TouchableOpacityItem>
        <BackButton />
    </SecondaryView>
    );
};
