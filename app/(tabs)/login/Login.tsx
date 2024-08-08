import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, ActivityIndicator, Keyboard, View, GestureResponderEvent, TextInput, StyleSheet } from 'react-native';
import { styles } from "@/components/util/Theme";
import { LinearGradientSecondary, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAsync, LoginResponse, verifyAuthToken } from "./loginSlice";

interface LoginProps {
    username: string;
    password: string;
}

export default function Login ({ navigation }: { navigation: any }){
    const [isLoading, setIsLoading] = useState(true);
    const theme = useAppSelector(state => state.theme.colors);
    const [login, setLogin] = useState<LoginProps>({ username: '', password: '' });
    const inputRef = useRef<TextInput>(null);
    const textRef = useRef<TextInput>(null);
    const [checkLogin, setCheckLogin] = useState(false);
    const dispatch = useAppDispatch();
    const [loginState, setLoginState] = useState<LoginResponse>({} as LoginResponse);
    const storageKey = process.env.EXPO_PUBLIC_STORAGE_KEY;
    
    // Disable the add button when the keyboard is visible
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
    
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const handleSigninWithCredentials = async () => {
        // Sign in with credentials
        navigation.navigate('Shopping List');
        return;
        if (login.username === '' || login.password === '') {
            console.log('Username or password is empty');
            return;
        }
    
        try {
            const response = await dispatch(loginAsync({ userName: login.username, password: login.password }));
            
            if (response.payload.status === 'success') {
                setLoginState(response.payload);
                await storeData(response.payload.id + response.payload.tokenExpiry);
                navigation.navigate('Shopping List');
            } else {
                console.log('Login failed');
                // Handle login failure here if needed
            }
        } catch (error) {
            console.log('Error during login:', error);
            // Handle error during login process
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            const response = await getDataAndVerify();
            if (response) {
                navigation.navigate('Shopping List');
            }
            setIsLoading(false);
        };
        verifyToken();
    }, []);

    const storeData = async (value: string) => {
        try {
            if (storageKey){
                await AsyncStorage.setItem(storageKey, value);
                console.log('Data stored:', value);
            }
        }
        catch (e) {
            console.log('Error:', e);
        }
    }

    const getDataAndVerify = async () => {
        try {
            if (storageKey){
                const value = await AsyncStorage.getItem(storageKey);
                console.log('Data retrieved:', value);
                if(value !== null) {
                    // value previously stored
                    const response = await dispatch(verifyAuthToken(value));
                    setLoginState(response.payload);
                    console.log('Login State:', loginState);
                    return response.payload.status === 'success';
                }
            }
            return false;
        } catch(e) {
            // error reading value
            console.log('Error:', e);
            return false;
        }
    }

    const handleOAuthSignIn = (type: string) => {
        // Sign in with OAuth
        console.log('Sign in with OAuth:', type);
    }

    if (isLoading) {
        return <ActivityIndicator />;
    }

    return (
        <SecondaryView 
                style={[styles.container, {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}
            >
            <TextPrimary style={{
                fontSize: 38,
                marginBottom: 30,
                fontStyle: 'italic',
            }}>
                <TextSecondary style={{ fontStyle: 'normal' }}>1</TextSecondary>Trip <FontAwesome5 name="location-arrow" size={38} color={theme.textPrimary} />
            </TextPrimary>
            <SecondaryView style={{
                width: '90%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 15,
            }}>
                <TextInput
                    id="username"
                    style={{
                        color: 'white',
                        padding: 10,
                        width: '100%',
                    }}
                    ref={textRef}
                    value={login.username}
                    onSubmitEditing={() => inputRef.current?.focus()}
                    returnKeyType="next"
                    selectionColor={theme.textSecondary}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="username"
                    onChange={e => setLogin({...login, username: e.nativeEvent.text })}
                    placeholder="Username"
                />
            </SecondaryView>
            <SecondaryView style={{
                width: '90%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 15,
                marginTop: 15,
                marginBottom: 25,
            }}>
                <TextInput
                    id="password"
                    ref={inputRef}
                    style={{
                        color: 'white',
                        padding: 10,
                        borderBottomColor: 'rgba(255,255,255,0.5)',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        width: '100%',
                    }}
                    onSubmitEditing={handleSigninWithCredentials}
                    textContentType="password"
                    selectionColor={theme.textSecondary}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    onChange={e => setLogin({...login, password: e.nativeEvent.text})}
                    placeholder="Password"
                />
            </SecondaryView>
            {!isKeyboardVisible && 
                <View style={[styles.justified, { width: '100%' }]}>
                    <LinearGradientSecondary
                            colors={[]}
                            style={[{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                padding: 5,
                                borderRadius: 50,
                            }]}
                        >
                        <TouchableOpacity
                            onPress={handleSigninWithCredentials}
                            style={styles.justified}
                        >
                            <TextPrimary style={[styles.textStyle]}>Sign In</TextPrimary>
                        </TouchableOpacity>
                    </LinearGradientSecondary>
                    <TouchableOpacity
                        onPress={() => {
                            // navigate to other tab
                        }}
                        style={styles.justified}
                    >
                        <TextSecondary style={[styles.header3]}>Forgot Password?</TextSecondary>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            // navigate to other tab
                        }}
                        style={styles.justified}
                    >
                        <TextSecondary style={[styles.header3, { paddingBottom: 0 }]}>Sign Up</TextSecondary>
                    </TouchableOpacity>
                    <View style={[styles.separator]}></View>
                    <View>
                        <TextSecondary style={[styles.header3, { lineHeight: 8 }]}>Or</TextSecondary>
                    </View>
                    <View style={[styles.flexRow, styles.justified]}>
                        <TouchableOpacity style={styles.iconSelection} onPress={() => handleOAuthSignIn('facebook')}>
                            <FontAwesome name="facebook-f" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconSelection} onPress={() => handleOAuthSignIn('instagram')}>
                            <FontAwesome name="instagram" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconSelection} onPress={() => handleOAuthSignIn('tiktok')}>
                            <FontAwesome5 name="tiktok" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SecondaryView>
    );
};