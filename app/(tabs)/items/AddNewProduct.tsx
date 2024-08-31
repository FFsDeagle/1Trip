import { LinearGradient, TextSecondary } from "@/components/Themed";
import { TextInput, View, TouchableOpacity } from "react-native";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { styles } from "@/components/util/Theme";
import { addItem, InventoryItem } from './ItemSlice';
import { useRef, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function AddNewProduct(){
    const dispatch = useAppDispatch();
    const theme = useAppSelector(state => state.theme.colors);
    const [product, setProduct] = useState<InventoryItem>({} as InventoryItem);
    const descriptionRef = useRef<TextInput>(null);
    const uomRef = useRef<TextInput>(null);
    const categoryRef = useRef<TextInput>(null);
    const defaultExpiryRef = useRef<TextInput>(null);
    const categories = useAppSelector(state => state.item.categories);

    const handleSubmit = async () => {
        // Check properties of the product object
        console.log(product);
        if (!product.name || !product.description || !product.uom || !product.category || !product.defaultExpiry) {
            return;
        }
        await dispatch(addItem(product));
        setProduct({} as InventoryItem);
    }

    // id: string,
    // name: string,
    // description: string,
    // category: string,
    // uom: number,
    // defaultExpiry: number,

    return (
        <LinearGradient colors={[]} style={[styles.container, styles.justifiedStart]}>
            <TextSecondary style={[styles.getStartedText, { marginTop: 10 }]}> Add New Product </TextSecondary>
            <View style={[styles.justified, { width: '100%' }]}>
                <TextInput returnKeyType="next" onSubmitEditing={() => descriptionRef?.current?.focus()} value={product.name} onChange={e => setProduct({...product, name: e.nativeEvent.text})} style={[styles.inputItem, { backgroundColor: theme.primary, color: theme.textPrimary }]} placeholder="Product Name" />
                <TextInput returnKeyType="next" ref={descriptionRef} onSubmitEditing={() => uomRef?.current?.focus()} value={product.description} onChange={e => setProduct({...product, description: e.nativeEvent.text})} style={[styles.inputItem, { backgroundColor: theme.primary, color: theme.textPrimary }]} placeholder="Product Description" />
                <TextInput
                    returnKeyType="next"
                    ref={uomRef}
                    onSubmitEditing={() => categoryRef?.current?.focus()}
                    value={product.uom?.toString()} 
                    onChange={(e) => {
                        const value = e.nativeEvent.text;
                        const numericValue = value ? parseFloat(value) : '';
                        setProduct({ ...product, uom: Number(numericValue) });
                    }}
                    style={[styles.inputItem, { backgroundColor: theme.primary, color: theme.textPrimary }]} 
                    placeholder="Product Quantity"
                    keyboardType="numeric"
                />
                <Picker
                    selectedValue={product.category}
                    onValueChange={(itemValue, itemIndex) =>
                        setProduct({ ...product, category: itemValue })
                    }
                    style={[styles.inputItem, { backgroundColor: theme.primary, color: theme.textPrimary }]}
                >
                    {categories.map((category) => (
                        <Picker.Item key={category.id} label={category.name} value={category} />
                    ))}
                </Picker><TextInput ref={defaultExpiryRef} keyboardType="numeric" onSubmitEditing={handleSubmit} value={product.defaultExpiry?.toString()}                     
                    onChange={(e) => {
                        const value = e.nativeEvent.text;
                        const numericValue = value ? parseFloat(value) : '';
                        setProduct({ ...product, defaultExpiry: Number(numericValue) });
                    }} style={[styles.inputItem, { backgroundColor: theme.primary, color: theme.textPrimary }]} placeholder="Default expiry date" />
            </View>
            <View style={styles.justifiedCenter}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.flexRow, styles.justified, { marginTop: 10, backgroundColor: theme.primary, width: 'auto', padding: 10, borderRadius: 10 }]}>
                    <TextSecondary>Add Product </TextSecondary>
                    <FontAwesome6 name="plus" size={24} color={theme.iconColor} /> 
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}