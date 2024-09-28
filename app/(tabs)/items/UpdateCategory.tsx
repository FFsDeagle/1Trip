import { LinearGradient, TextPrimary, TextSecondary } from "@/components/Themed";
import { Categories, deleteCategories, updateCategories } from "./ItemSlice";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { ItemsStackParamList } from "@/constants/types";
import { styles } from "@/components/util/Theme";
import { TextInput, TouchableOpacity, View } from "react-native";
import BackButton from "@/components/util/BackButton";


export default function UpdateCategory({ route }: { route: any }) {
    const { category } = route.params;
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
    const [categoryData, setCategoryData] = useState<Categories>({} as Categories);
    const theme = useAppSelector(state => state.theme.colors);
    const { id } = useAppSelector(state => state.login.loginResponse);

    useEffect(() => {
        setCategoryData(category);
    }, [category])    

    const handleUpdate = async () => {
        // Update category
        if (categoryData.name === '') return;
        await dispatch(updateCategories({ id, category: categoryData }));
        navigation.goBack();
    }

    const handleDelete = async () => {
        // Delete category
        await dispatch(deleteCategories({ id, category }));
        navigation.goBack();
    }

    return (
        <LinearGradient style={styles.container} colors={[]}>
            <TextSecondary style={[styles.getStartedText, { marginTop: 10 }]}>Update Category</TextSecondary>
            <View style={[styles.justified]}>
                <View style={[styles.justifiedApart, styles.flexRow, styles.inputItem, { width: '90%', backgroundColor: theme.primary }]}>
                    <TextInput
                        placeholder="Category Name"
                        value={categoryData.name}
                        onChangeText={text => setCategoryData({ ...categoryData, name: text })}
                        style={[{ width: '100%', color: theme.textPrimary }]}
                    />
                </View>
            </View>
            <View style={[styles.flexRow, styles.justifiedCenter]}>
                <TouchableOpacity onPress={handleUpdate} style={[styles.button, { backgroundColor: theme.primary, width: '45%' }]}>
                    <TextPrimary style={styles.buttonText}>Update</TextPrimary>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={[styles.button, { backgroundColor: theme.primary, width: '45%'  }]}>
                    <TextPrimary style={styles.buttonText}>Delete</TextPrimary>
                </TouchableOpacity>
            </View>
            <BackButton />
        </LinearGradient>
    )
}