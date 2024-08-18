import { useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextPrimary, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { ShoppingList, ShoppingListTypes } from './ShoppingSlice';
import { FlatList, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { ShoppingStackParamList } from "@/constants/Types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";

interface RenderShoppingListsProps {
    listType: keyof ShoppingListTypes;
  }

export default function RenderShoppingLists({ listType }: RenderShoppingListsProps){
    const shoppingLists = useAppSelector(state => state.shoppingLists.lists && state.shoppingLists.lists[listType]);
    const lists = useAppSelector(state => state.shoppingLists);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const [list, setList] = useState<ShoppingList[]>(shoppingLists);

    console.log(lists);

    return (
        <View>
            {list && 
                    <SecondaryView>
                        <FlatList
                            data={list}
                            style={{
                                width: '100%',
                            }}
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
            }
        </View>
    )
}