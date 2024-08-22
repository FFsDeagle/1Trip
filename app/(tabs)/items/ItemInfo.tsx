import { styles } from "@/components/util/Theme";
import { useNavigation } from "expo-router";
import { ItemsStackParamList } from "@/constants/types";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import BackButton from "@/components/util/BackButton";
import { SecondaryView, TextPrimary, TextSecondary, TouchableOpacityItem } from "@/components/Themed";

type ItemInfoRouteProp = RouteProp<ItemsStackParamList, 'ItemInfo'>;

export default function ItemInfo() {
  const route = useRoute<ItemInfoRouteProp>();
    const navigation = useNavigation<NavigationProp<ItemsStackParamList, 'ItemInfo'>>();

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
        Item info
      </TextPrimary>
        <TouchableOpacityItem
            onPress={() => {
                console.log('Item clicked');
                navigation.navigate('ItemMain');
            }}
        >
          <TextSecondary style={styles.title}>{searchValue}</TextSecondary>
        </TouchableOpacityItem>
        <BackButton />
    </SecondaryView>
    );
};
