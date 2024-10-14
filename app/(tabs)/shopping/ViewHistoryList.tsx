import { LinearGradientSecondary, ScrollView, SecondaryView, TextPrimary } from "@/components/Themed";
import { ShoppingList } from "./ShoppingSlice";
import { RouteProp } from "@react-navigation/native";
import { View } from "react-native";
import { styles } from "@/components/util/Theme";

type ShoppingStackParam = {
    ViewShoppingList: { list: ShoppingList };
  };
  

type ViewShoppingListProps = {
    route: RouteProp<ShoppingStackParam, "ViewShoppingList">;
  };

export default function ViewHistoryList({ route }: ViewShoppingListProps) {
    const { list } = route.params;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <LinearGradientSecondary style={[styles.container, styles.justifiedStart, { alignItems: 'center', paddingTop: 10 }]} colors={[]}>
                    {list.items.map(item => {
                        return (
                            <SecondaryView key={item._id} style={[styles.flexRow, styles.justifiedApart, styles.listItem, 
                            { width: '90%', borderRadius: 15, margin: 5}]}>
                                <View style={[styles.flexRow, styles.justifiedApart, {width: '80%'}]}>
                                    <TextPrimary>
                                        {item.name}
                                    </TextPrimary>
                                    <TextPrimary>
                                        {item.category}
                                    </TextPrimary>
                                </View>
                                <View style={[styles.justfiedEnd, { right: 10}]}>
                                    <TextPrimary>
                                        {item.quantity}
                                    </TextPrimary>
                                </View>
                            </SecondaryView>
                        )
                    })}
            </LinearGradientSecondary>
        </ScrollView>
    )
}