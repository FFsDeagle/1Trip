import { useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";

export default function FavItemsWidget(){
    const products = useAppSelector(state => state.item.items);
    const theme = useAppSelector(state => state.theme.colors);

    return (
        <SecondaryView>
            <View style={[styles.flexRow, styles.justifiedApart]}>
                <TextSecondary style={[styles.header2, {color: theme.textPrimary}]}>
                    Favorites
                </TextSecondary>
                <TouchableOpacity style={[styles.justified, { right: 15 }]}>
                    <AntDesign name="setting" size={24} color={theme.textPrimary} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.listItem, styles.flexRow, styles.justifiedApart]}>
                    <View style={[styles.flexRow, { width: 'auto' }]}>
                        <TextSecondary style={[styles.listText]}>Name </TextSecondary>
                        <TextSecondary style={[styles.listText, {borderLeftColor: theme.background, borderLeftWidth: 1 }]}>Description</TextSecondary>
                    </View>
                    <TextSecondary style={[styles.listText]}>Category</TextSecondary>
            </TouchableOpacity>
            {products && products.length > 0 && products.slice(0, 3).map((product) => {
                return(
                    <TouchableOpacity style={[styles.listItem, styles.flexRow, styles.justifiedApart]} key={product._id}>
                        <View style={[styles.flexRow, { width: 'auto' }]}>
                            <TextSecondary style={styles.listText}>{product.name}</TextSecondary>
                            <TextSecondary style={[styles.listText, { marginLeft: 8 }]}>{product.description}</TextSecondary>
                        </View>
                        <TextSecondary style={styles.listText}>{product.category}</TextSecondary>
                    </TouchableOpacity>
                )
            })}
        </SecondaryView>
    )

}