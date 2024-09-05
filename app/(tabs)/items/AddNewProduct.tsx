import { LinearGradient, TextSecondary } from "@/components/Themed";
import { TextInput, View, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { styles } from "@/components/util/Theme";
import { addItem, InventoryItem } from './ItemSlice';
import { useEffect, useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import BackButton from "@/components/util/BackButton";
import AddOrEditProduct from "./AddOrEditProduct";

type InputValidation = {
    name: boolean;
    description: boolean;
    uom: boolean;
    category: boolean;
    defaultExpiry: boolean;
}

export default function AddNewProduct(){
    const [product, setProduct] = useState<InventoryItem>({} as InventoryItem);
    const categories = useAppSelector(state => state.item.categories);

    useEffect(() => {
        setProduct({ ...product, category: categories[0].name });
    }, [])

    return (
        <LinearGradient colors={[]} style={[styles.container, styles.justifiedStart]}>
            <TextSecondary style={[styles.getStartedText, { marginTop: 10 }]}> Add New Product </TextSecondary>
            <AddOrEditProduct item={product} adding={true} />
            <BackButton />
        </LinearGradient>
    )
}