import { LinearGradient, TextPrimary, TextSecondary } from "@/components/Themed";
import { TextInput, View, TouchableOpacity} from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { styles } from "@/components/util/Theme";
import BackButton from "@/components/util/BackButton";
import { useEffect, useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { addCategories, Categories } from "./ItemSlice";
import AnimatedModal from "@/components/animations/AnimatedModal";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { ItemsStackParamList } from "@/constants/types";

export default function AddNewCategory(){
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.colors);
    const focusRef = useRef<TextInput>(null);
    const [category, setCategory] = useState<string>('');
    const categories = useAppSelector(state => state.item.categories);
    const [modal, showModal] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();

    const handleSubmit = async () => {
        if (category === '') {
            setError(true);
            showModal(true);
            return;
        }
        if (categories.find(cat => cat.name.toLowerCase() === category.toLowerCase())) {
            setError(false);
            showModal(true);
            return;
        }
        await dispatch(addCategories({ name: category } as Categories));
        navigation.goBack();
    }

    useEffect(() => {
        focusRef.current?.focus();
    },[])

    return (
        <LinearGradient colors={[]} style={[styles.container, styles.justified]}>
            {modal && <AnimatedModal message={error ? "Category name cannot be empty" : "Category already exists"} setShowModal={showModal} showModal={modal} />}
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.secondary, marginTop: 20 }]}>
                <TextSecondary style={[styles.getStartedText, { marginTop: 10, lineHeight: 14 }]}> Add New Category </TextSecondary>
            </View>
            <View style={[styles.justifiedApart, styles.flexRow, styles.inputItem, { width: '90%', backgroundColor: theme.primary }]}>
                <TextInput
                    returnKeyType="next"
                    ref={focusRef}
                    value={category} 
                    onChange={(e) => setCategory(e.nativeEvent.text)}
                    style={[{ color: theme.textPrimary }]} 
                    placeholder="Category Name"
                />
            </View>
            <View style={styles.justifiedCenter}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.flexRow, styles.justified, { marginTop: 10, marginBottom: 30, backgroundColor: theme.primary, width: 'auto', padding: 10, borderRadius: 10 }]}>
                    <TextSecondary>Add Category </TextSecondary>
                    <FontAwesome6 name="plus" size={24} color={theme.iconColor} />
                </TouchableOpacity>
            </View>
            <BackButton />
        </LinearGradient>
    )
}