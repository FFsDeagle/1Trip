import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { LinearGradient, SecondaryView, TextPrimary, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { forgotPassword, LoginProps } from "./loginSlice";
import BackButton from "@/components/util/BackButton";

export default function ForgotPassword() {
    const theme = useAppSelector(state => state.theme.colors);
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<LoginProps>({
        email: '',
        password: '',
    });
    
    const handleForgotPassword = async () => {
        console.log("Attempting to reset password with email:", login.email);
        if (login.email === '') {
            return;
        }
        await dispatch(forgotPassword(login));
    }

    return (
        <LinearGradient style={[styles.container]} colors={[]}>
            <View style={[styles.justified, { marginTop: 20 }]}>
                <TextSecondary style={[styles.getStartedText]}>Forgot Password</TextSecondary>
                <View style={[styles.justified, { width: '100%' }]}>
                    <TextPrimary style={[styles.getStartedText, styles.justifiedStart]}>Enter your username</TextPrimary>
                    <SecondaryView style={{
                        width: '90%',
                        backgroundColor: 'rgba(0,0,0,0.1)',
                        borderRadius: 15,
                        marginTop: 15,
                        marginBottom: 25,
                    }}>
                        <TextInput
                            id="username"
                            style={{
                                color: 'white',
                                padding: 10,
                                borderBottomColor: 'rgba(255,255,255,0.5)',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                width: '100%',
                            }}
                            textContentType="username"
                            selectionColor={theme.textSecondary}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChange={e => setLogin({...login, email: e.nativeEvent.text})}
                            placeholder="Email"
                        />
                    </SecondaryView>
                </View>
                <TouchableOpacity style={[styles.button]} onPress={handleForgotPassword}>
                    <TextPrimary style={[styles.buttonText, styles.justifiedStart]}>Send Password Reset</TextPrimary>
                </TouchableOpacity>
            </View>
            <BackButton />
        </LinearGradient>
    )
}