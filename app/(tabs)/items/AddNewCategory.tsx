import { LinearGradient, TextSecondary } from "@/components/Themed";
import { TextInput, View, TouchableOpacity} from "react-native";
import { useAppDispatch } from "@/app/store/hooks";
import { styles } from "@/components/util/Theme";

export default function AddNewCategory(){
    const dispatch = useAppDispatch();

    return (
        <LinearGradient colors={[]} style={[styles.container, styles.justifiedStart]}>
            <TextSecondary> Add New Category </TextSecondary>
            <View>
                <TextInput style={styles.listItem} placeholder="Category Name.." />
            </View>
            <TouchableOpacity>
                <TextSecondary> Add Product </TextSecondary>
            </TouchableOpacity>
        </LinearGradient>
    )
}