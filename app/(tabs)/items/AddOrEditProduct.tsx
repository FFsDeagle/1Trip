import { styles } from "@/components/util/Theme";
import { TextInput, TouchableOpacity, View } from "react-native";
import { addItem, InventoryItem, updateProduct } from "./ItemSlice";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { TextPrimary, TextSecondary } from "@/components/Themed";
import { ScrollView } from "react-native";
import { useNavigation } from "expo-router";
import { NavigationProp } from "@react-navigation/native";
import { ItemsStackParamList } from "@/constants/types";

type InputValidation = {
    name: boolean;
    description: boolean;
    uom: boolean;
    category: boolean;
    defaultExpiry: boolean;
}

interface AddOrEditProductProps {
    item: InventoryItem;
    adding: boolean;
}

export default function AddOrEditProduct({ item, adding } : AddOrEditProductProps){
    const theme = useAppSelector(state => state.theme.colors);
    const [product, setProduct] = useState<InventoryItem>(item);
    const descriptionRef = useRef<TextInput>(null);
    const uomRef = useRef<TextInput>(null);
    const categoryRef = useRef<TextInput>(null);
    const defaultExpiryRef = useRef<TextInput>(null);
    const categories = useAppSelector(state => state.item.categories);
    const [error, setError] = useState<InputValidation>({} as InputValidation);
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();
    const { id } = useAppSelector(state => state.login.loginResponse);

    const handleSubmit = async () => {
        setFormSubmitted(true);
        if (!product.name || !product.description || !product.uom || !product.category || !product.defaultExpiry) {
            return;
        }
        if (adding) {
            await dispatch(addItem({ id, product }));
        } else {
            // Update product
            await dispatch(updateProduct({id, product}));
        }
        setFormSubmitted(false);
        setError({} as InputValidation);
        setProduct({} as InventoryItem);
        setProduct({ ...product, category: categories[0].name });
        if (!adding) {
            // Go back to previous screen
            navigation.goBack();
        }
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
        console.log('item', product);
        if (adding) {
            setProduct(item);
            return;
        }
        setProduct({ ...product, category: categories[0].name });
    }, [])

    return (
        <ScrollView contentContainerStyle={[styles.justified, { width: '100%' }]}>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12 }]}>Name</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
                <TextInput 
                    returnKeyType="next" 
                    onSubmitEditing={() => descriptionRef?.current?.focus()} 
                    value={product.name} 
                    onChange={e => setProduct({...product, name: e.nativeEvent.text})} 
                    style={[{color: theme.textPrimary }]} 
                    placeholder="Product Name" 
                />
                {formSubmitted ? (error.name ? <FontAwesome6 name="check" style={{right: 10}} size={24} color="green" /> : <FontAwesome6 name="circle-exclamation" size={24} color="red" />) : null}
            </View>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12  }]}>Description</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
                <TextInput 
                    returnKeyType="next" 
                    ref={descriptionRef} 
                    onSubmitEditing={() => uomRef?.current?.focus()} 
                    value={product.description} 
                    onChange={e => setProduct({...product, description: e.nativeEvent.text})} 
                    style={[{ color: theme.textPrimary }]} 
                    placeholder="Product Description" 
                />
                {formSubmitted ? (error.description ? <FontAwesome6 name="check" style={{right: 10}} size={24} color="green" /> : <FontAwesome6 name="circle-exclamation" size={24} color="red" />) : null}
            </View>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12  }]}>Unit of Measure</TextPrimary>
            <View style={[styles.justifiedApart, styles.flexRow, styles.inputItem, { width: '90%', backgroundColor: theme.primary }]}>
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
                    style={[{ color: theme.textPrimary }]} 
                    placeholder="Product Quantity"
                    keyboardType="numeric"
                />
                {formSubmitted ? (error.uom ? <FontAwesome6 name="check" style={{right: 10}} size={24} color="green" /> : <FontAwesome6 name="circle-exclamation" size={24} color="red" />) : null}
            </View>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12  }]}>Category</TextPrimary>
            <View style={[styles.justifiedCenter, styles.justifiedApart, styles.flexRow, styles.inputItem, { width: '90%', backgroundColor: theme.primary }]}>
                <Picker
                    selectedValue={product.category}
                    onValueChange={(e) => setProduct({ ...product, category: e })}
                    style={[{ backgroundColor: theme.primary, color: theme.textPrimary, width: '70%' }]}
                >
                    {categories.map((category) => (
                        <Picker.Item key={category._id} label={category.name} value={category.name} />
                    ))}
                </Picker>
                {formSubmitted ? (error.category ? <FontAwesome6 name="check" style={{right: 10}} size={24} color="green" /> : <FontAwesome6 name="circle-exclamation" size={24} color="red" />) : null}
            </View>
            <TextPrimary style={[styles.flexRow, styles.justifiedStart, styles.getStartedText, { verticalAlign: 'middle', lineHeight: 12  }]}>Default Expiry (days)</TextPrimary>
            <View style={[styles.justifiedApart, styles.inputItem, styles.flexRow, ,{ width: '90%', backgroundColor: theme.primary }]}>
                <TextInput 
                    ref={defaultExpiryRef} 
                    keyboardType="numeric" 
                    onSubmitEditing={handleSubmit} 
                    value={product.defaultExpiry?.toString()}                     
                    onChange={(e) => {
                        const value = e.nativeEvent.text;
                        const numericValue = value ? parseFloat(value) : '';
                        setProduct({ ...product, defaultExpiry: Number(numericValue) });
                    }} 
                    style={[{ color: theme.textPrimary }]}
                    placeholder="Default expiry date" 
                />
                {formSubmitted ? (error.defaultExpiry ? <FontAwesome6 name="check" style={{right: 10}} size={24} color="green" /> : <FontAwesome6 name="circle-exclamation" size={24} color="red" />) : null}
            </View>
            <View style={styles.justifiedCenter}>
                <TouchableOpacity onPress={handleSubmit} style={[styles.flexRow, styles.justified, { marginTop: 10, marginBottom: 30, backgroundColor: theme.primary, width: 'auto', padding: 10, borderRadius: 10 }]}>
                    <TextSecondary>{adding ? "Add Product " : "Update Product "}</TextSecondary>
                    <FontAwesome6 name={adding ? "plus" : "edit"} size={24} color={theme.iconColor} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}