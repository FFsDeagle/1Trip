import { useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextPrimary, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { ShoppingList, ShoppingListTypes } from './ShoppingSlice';
import { FlatList } from "react-native";
import { styles } from "@/components/util/Theme";
import { ShoppingStackParamList } from "@/constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";

interface RenderShoppingListsProps {
    listType: keyof ShoppingListTypes;
    title: string;
  }

export default function RenderShoppingLists({ listType, title }: RenderShoppingListsProps){
    const shoppingLists = useAppSelector(state => state.shoppingLists.lists && state.shoppingLists.lists[listType]);
    const shoppingListTest = useAppSelector(state => state.shoppingLists.lists?.generatedLists);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();

    console.log(shoppingListTest);

    return (
        <SecondaryView>
            <TextPrimary
                style={styles.heading}
            >
              {title}
            </TextPrimary>
            <FlatList
                data={shoppingLists}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ViewShoppingList', { list: item as ShoppingList } )}
                    >
                        <TextSecondary
                            style={styles.listItem}
                        >
                            {item.name}
                        </TextSecondary>
                    </TouchableOpacity>
                )}
            />
        </SecondaryView>
    )
}