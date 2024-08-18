import { Animated, Dimensions, TextInput, View } from "react-native";
import { PrimaryView, TextPrimary, TextSecondary, TouchableOpacity } from "../Themed";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { styles } from "../util/Theme";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SaveShoppingList } from "@/app/(tabs)/shopping/ShoppingSlice";

type AnimatedModalProps = {
    message: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    showModal: boolean;
    setListSaved: Dispatch<SetStateAction<boolean>>;
    setName: Dispatch<SetStateAction<string>>;
    name: string;
}

export default function AnimatedModalWithInput({ setName, name, setListSaved, message, setShowModal, showModal }: AnimatedModalProps){
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const theme = useAppSelector(state => state.theme.colors);
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (showModal)
        {
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true
            }).start();
        }
    },[])

    const hideModalWithDelay = () => {
        Animated.spring(slideAnim, {
            toValue: Dimensions.get('window').height,
            useNativeDriver: true,
        }).start(() => {
            setShowModal(false);
        });
    }

    const saveList = () => {
        if (name.length > 2){
            setListSaved(true)
        } else {
            setError('Please enter a name for your list');
        }
    }

    return (
        <Animated.View style={[styles.container, styles.justified, {
            position: 'absolute',
            zIndex: 110,
            transform: [{translateY: slideAnim}],
        }]}>
            <PrimaryView style={[styles.justified, {
                backgroundColor: theme.background2,
                padding: 10,
                borderRadius: 15,
                elevation: 5,
                width: '80%'
            }]}>
                <TextSecondary style={[styles.title, styles.listItem, { paddingBottom: 2}]}>
                    Create List
                </TextSecondary>
                <TextSecondary style={[styles.subtitle, { marginTop: 10, marginBottom: 10 }]}>
                    {message}
                </TextSecondary>
                <View style={{
                    width: '90%',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 15,
                }}>
                    <TextInput
                        id="name"
                        style={{
                            color: 'white',
                            padding: 10,
                            width: '100%',
                            fontStyle: 'italic',
                        }}
                        returnKeyType="next"
                        selectionColor={theme.textSecondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                        textContentType="name"
                        onSubmitEditing={hideModalWithDelay}
                        onChange={e => setName(e.nativeEvent.text)}
                        placeholder="Your shopping list name.."
                    />
                </View>
                {error.length > 0 && <TextSecondary style={{
                    color: 'red',
                    fontSize: 12,
                    marginTop: 8,
                }}>
                    {error}
                </TextSecondary>}
                <View style={[styles.flexRow, styles.justifiedCenter]}>
                    <TouchableOpacity style={{
                        borderRadius: 15,
                        padding: 10,
                        marginTop: 10,
                        margin: 5,
                        backgroundColor: theme.background3
                    }} onPress={hideModalWithDelay}>
                        <TextPrimary>
                            Back
                        </TextPrimary>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRadius: 15,
                        padding: 10,
                        marginTop: 10,
                        margin: 5,
                        backgroundColor: theme.background3
                    }} onPress={saveList}>
                        <TextPrimary>
                            Okay
                        </TextPrimary>
                    </TouchableOpacity>
                </View>
            </PrimaryView>
        </Animated.View>
    )
}