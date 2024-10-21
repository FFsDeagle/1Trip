import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { LinearGradient, LinearGradientSecondary, ScrollView, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { TouchableOpacity } from 'react-native';
import { DeleteIncompleteList, DeleteList, ShoppingList, ShoppingListTypes } from './ShoppingSlice';
import { Dimensions, FlatList, View } from "react-native";
import { styles } from "@/components/util/Theme";
import { ShoppingStackParamList } from "@/constants/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

interface RenderShoppingListsProps {
    listType: keyof ShoppingListTypes;
    title: string;
  }

export default function RenderShoppingLists({ title, listType }: RenderShoppingListsProps){
    const shoppingLists = useAppSelector(state => state.shoppingLists.lists && state.shoppingLists.lists[listType]);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList>>();
    const { id } = useAppSelector(state => state.login.loginResponse);
    const [list, setList] = useState<ShoppingList[]>(shoppingLists);
    const theme = useAppSelector(state => state.theme.colors);
    const dispatch = useAppDispatch();
    const [readonly, setReadonly] = useState<boolean>(false);

    useEffect(() => {
        if (listType === "history"){
            console.log('setting history')
            setReadonly(true);
        }
    }, [])

    const handleDelete = async (selectedList: ShoppingList) => {
        if (listType === 'incompleteLists') {
            await dispatch(DeleteIncompleteList({ id, list: selectedList }));
        }
        else {
            await dispatch(DeleteList({ id, list: selectedList }));
        }
        setList([...list.filter(item => item._id !== selectedList._id)])
    }

    return (
        <View>
            {list && 
                    <LinearGradient
                        colors={[]}
                        style={[styles.container]}
                    >
                        <FlatList
                            numColumns={2}
                            data={list}
                            renderItem={({item, index}: { item: ShoppingList, index: number }) => (
                                <View
                                    key={index + 1}
                                    style={[
                                        {
                                            width: '45%', 
                                            height: 'auto',
                                            backgroundColor: theme.primary,
                                            margin: 10,
                                            borderRadius: 15,
                                            elevation: 5,
                                            overflow: 'hidden',
                                        }
                                    ]}
                                >
                                    <View style={[styles.justifiedApart, styles.listItem, { alignItems: 'center', paddingTop: 10, paddingLeft: 15, paddingRight: 15 }]}>
                                        <TextSecondary>
                                            {item.name}
                                        </TextSecondary>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate(readonly ? 'ViewHistoryList' : 'ViewShoppingList', { name: listType, list: item as ShoppingList, listType } )}>
                                                <FontAwesome6 name="eye" size={16}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.justifiedApart, { paddingTop: 10, paddingLeft: 15, paddingRight: 15 }]}>
                                        <View>
                                            <TextSecondary>
                                                Items
                                            </TextSecondary>
                                        </View>
                                        <View>
                                            <TextSecondary>
                                                {item.items.length}
                                            </TextSecondary>
                                        </View>
                                    </View>
                                    <ScrollView horizontal={true}>
                                        {item.items.map(x => {
                                            return (
                                                <View key={x._id} style={[styles.flexColumn, { padding: 10, paddingLeft: 15, paddingRight: 15 }]}>
                                                    <View>
                                                        <TextSecondary>
                                                            {x.name}
                                                        </TextSecondary>
                                                    </View>
                                                    <View>
                                                        <TextSecondary>
                                                            {x.quantity}
                                                        </TextSecondary>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </ScrollView>
                                    {!readonly && <View style={[styles.justifiedApart, styles.listItem, { alignItems: 'center', paddingTop: 10, paddingLeft: 15, paddingRight: 15 }]}>
                                        <TextSecondary>
                                            {item.name}
                                        </TextSecondary>
                                        <TouchableOpacity
                                            onPress={() => handleDelete(item)}>
                                                <FontAwesome6 name="trash-can" size={16}/>
                                        </TouchableOpacity>
                                    </View>}
                                </View>
                            )}
                        />
                    </LinearGradient>
            }
        </View>
    )
}