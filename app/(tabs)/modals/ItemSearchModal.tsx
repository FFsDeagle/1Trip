import { TouchableOpacity, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ItemsStackParamList } from "@/constants/Types";
import { NavigationProp } from "@react-navigation/native";
import { SecondaryView } from "@/components/Themed";

export default function ItemSearchModal() {
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
    console.log('ItemSearchModal', navigation);
    const params = useLocalSearchParams();
    const items = [
        {
            name: 'Test Item 1',
        },
        {
            name: 'Test Item 2',
        },
        {
            name: 'Test Item 3',
        }
    ];

    return (
        <View>
            {items.map((item, index) => (
                <TouchableOpacity
                    key={index}
                >
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                        onPress={() => navigation.navigate('ItemInfo', { searchValue: item.name })}
                    >
                        <SecondaryView style={styles.title}>{item.name}</SecondaryView>
                    </TouchableOpacity>
                </TouchableOpacity>
            ))}
        </View>
    )
}

