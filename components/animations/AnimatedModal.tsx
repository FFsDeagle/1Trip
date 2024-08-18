import { Animated, Dimensions } from "react-native";
import { PrimaryView, TextPrimary, TextSecondary, TouchableOpacity } from "../Themed";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { styles } from "../util/Theme";
import { useAppSelector } from "@/app/store/hooks";

type AnimatedModalProps = {
    message: string;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    showModal: boolean;
}

export default function AnimatedModal({ message, setShowModal, showModal }: AnimatedModalProps){
    const slideAnim = useRef(new Animated.Value(Dimensions.get('window').height)).current;
    const theme = useAppSelector(state => state.theme.colors);

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

    return (
        <Animated.View style={[styles.container, styles.justified, {
            position: 'absolute',
            zIndex: 100,
            transform: [{translateY: slideAnim}]
        }]}>
            <PrimaryView style={[styles.justified, {
                backgroundColor: theme.background2,
                padding: 10,
                borderRadius: 15,
                elevation: 5
            }]}>
                <TextSecondary style={[styles.title, styles.listItem, { paddingBottom: 2}]}>
                    Information
                </TextSecondary>
                <TextSecondary style={[styles.subtitle, { marginTop: 10, marginBottom: 10 }]}>
                    {message}
                </TextSecondary>
                <TouchableOpacity style={{
                    borderRadius: 15,
                    padding: 10,
                    marginTop: 10,
                    backgroundColor: theme.background3
                }} onPress={hideModalWithDelay}>
                    <TextPrimary>
                        Okay
                    </TextPrimary>
                </TouchableOpacity>
            </PrimaryView>
            
        </Animated.View>
    )
}