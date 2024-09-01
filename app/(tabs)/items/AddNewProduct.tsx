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
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.colors);
    const [product, setProduct] = useState<InventoryItem>({} as InventoryItem);
    const descriptionRef = useRef<TextInput>(null);
    const uomRef = useRef<TextInput>(null);
    const categoryRef = useRef<TextInput>(null);
    const defaultExpiryRef = useRef<TextInput>(null);
    const categories = useAppSelector(state => state.item.categories);
    const [error, setError] = useState<InputValidation>({} as InputValidation);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const handleSubmit = async () => {
        setFormSubmitted(true);
        if (!product.name || !product.description || !product.uom || !product.category || !product.defaultExpiry) {
            return;
        }
        await dispatch(addItem(product));
        setFormSubmitted(false);
        setError({} as InputValidation);
        setProduct({} as InventoryItem);
    }

    useEffect(() => {
        setError({
            name: product.name ? true : false,
            description: product.description ? true : false,
            uom: product.uom ? true : false,
            category: product.category ? true : false,
            defaultExpiry: product.defaultExpiry ? true : false,
        });
    },[formSubmitted])

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