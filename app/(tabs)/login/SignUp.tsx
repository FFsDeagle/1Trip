import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { LinearGradient, SecondaryView, TextPrimary, TextSecondary, TouchableOpacity } from "@/components/Themed";
import BackButton from "@/components/util/BackButton";
import { styles } from "@/components/util/Theme";
import { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { createAccount, LoginProps } from "./loginSlice";

export default function SignUp(){
    const theme = useAppSelector(state => state.theme.colors);
    const dispatch = useAppDispatch();
    const [login, setLogin] = useState<LoginProps>({
        userName: '',
        password: '',
    });
    
    const handleSignUp = async () => {
        if (login.userName === '' || login.password === '') {
            return;
        }
        dispatch(createAccount(login));
    }

    return (
        <LinearGradient style={[styles.container]} colors={[]}>
            <View style={[styles.justified, { marginTop: 20 }]}>
                <TextSecondary style={[styles.getStartedText]}>Sign Up</TextSecondary>
                <View style={[styles.justified, { width: '100%' }]}>
                    <TextPrimary style={[styles.getStartedText, styles.justifiedStart]}>Create an account</TextPrimary>
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
                            onChange={e => setLogin({...login, password: e.nativeEvent.text})}
                            placeholder="Username"
                        />
                    </SecondaryView>
                </View>
                <SecondaryView style={{
                    width: '90%',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    borderRadius: 15,
                    marginTop: 15,
                    marginBottom: 25,
                }}>
                    <TextInput
                        id="password"
                        style={{
                            color: 'white',
                            padding: 10,
                            borderBottomColor: 'rgba(255,255,255,0.5)',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                            width: '100%',
                        }}
                        onSubmitEditing={handleSignUp}
                        textContentType="password"
                        selectionColor={theme.textSecondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChange={e => setLogin({...login, password: e.nativeEvent.text})}
                        placeholder="Password"
                    />
                </SecondaryView>
                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button]}
                >
                    <TextPrimary style={[styles.buttonText]}>Create Account</TextPrimary>
                </TouchableOpacity>
            </View>
            <BackButton />
        </LinearGradient>
    )
}