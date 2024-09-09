import { useEffect, useRef, useState } from "react";
import { TouchableOpacity, Keyboard, View, GestureResponderEvent, TextInput, StyleSheet } from 'react-native';
import { styles } from "@/components/util/Theme";
import { LinearGradientSecondary, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAsync, LoginProps, verifyAuthToken } from "./loginSlice";
import LoadingIndicator from "@/components/animations/LoadingIndicator";
import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session';

export default function Login ({ navigation }: { navigation: any }){
//     // To add as env variables once acquired
//     const googleAuthRequestConfig = {
//         clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
//         scopes: ['profile', 'email'],
//         redirectUri: AuthSession.makeRedirectUri({
//             native: 'com.yourapp://redirect',
//         }),
//     };

//     const instagramAuthRequestConfig = {
//         clientId: 'YOUR_INSTAGRAM_CLIENT_ID',
//         scopes: ['user_profile'],
//         redirectUri: AuthSession.makeRedirectUri({
//             native: 'com.yourapp://redirect',
//         }),
//     }

//     const tiktokAuthRequestConfig = {
//         clientId: 'YOUR_TIKTOK_CLIENT_ID',
//         scopes: ['user_profile'],
//         redirectUri: AuthSession.makeRedirectUri({
//             native: 'com.yourapp://redirect',
//         }),
//     }

    // const googleOAuthDiscovery = AuthSession.useAutoDiscovery('https://accounts.google.com');
    // const instagramOAuthDiscovery = AuthSession.useAutoDiscovery('https://api.instagram.com');
    // const tiktokOAuthDiscovery = AuthSession.useAutoDiscovery('https://api.tiktok.com');
    // const [googleRequest, googleResponse, promptGoogleAsync] = useAuthRequest(googleAuthRequestConfig, googleOAuthDiscovery);
    // const [instagramRequest, instagramResponse, promptInstaAsync] = useAuthRequest(instagramAuthRequestConfig, instagramOAuthDiscovery);
    // const [tiktokRequest, tiktokResponse, promptTiktokAsync] = useAuthRequest(tiktokAuthRequestConfig, tiktokOAuthDiscovery);
    const [isLoading, setIsLoading] = useState(false);
    const theme = useAppSelector(state => state.theme.colors);
    const { loginState, loginResponse } = useAppSelector(state => state.login);
    const [login, setLogin] = useState<LoginProps>({ email: '', password: '' });
    const inputRef = useRef<TextInput>(null);
    const textRef = useRef<TextInput>(null);
    const dispatch = useAppDispatch();
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
        setIsLoading(true);
        if (login.email === '' || login.password === '') {
            console.log('Username or password is empty');
            setIsLoading(false);
            return;
        }
        try {
            await dispatch(loginAsync({ email: login.email, password: login.password }))
        } catch (error) {
            console.log('Error during login:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Check if there is a cached token and verify if it is still valid
        setIsLoading(true);
        loginWithStoredData();

        // If user signs in with Credentials then and the login is successful
        // The dependancy will trigger and store the data while navigating to the next screen
        if (loginState){
            const timeout = setTimeout(() => {
                storeTokenAndNavigate();
            }, 2000);
            return () => clearTimeout(timeout);
        }
        else {
            setIsLoading(false);
        }
    }, [loginState]);

    const loginWithStoredData = async () => {
        await getDataAndVerify();
    }

    const storeTokenAndNavigate = async () => {
        // Store data and navigate to the next screen
        await storeData(loginResponse.authToken.toString());
        navigation.navigate('Shopping List');
    }

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
                if(value === null) {
                    return false;
                }
                console.log('Data retrieved:', value);
                // value previously stored
                await dispatch(verifyAuthToken(value));
            }
            return false;
        } catch(e) {
            // error reading value
            console.log('Error:', e);
            return false;
        }
    }

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    }

    // const handleOAuthSignIn = async (type: string) => {
    //     // Sign in with OAuth
    //     if (type === 'google') {
    //         await promptGoogleAsync().then((result: AuthSession.AuthSessionResult) => {
    //             if (result.type === 'success') {
    //                 const { accessToken } = result.authentication as AuthSession.TokenResponseConfig;
    //                 // Store the token and navigate to the next screen
    //                 storeData(accessToken).then(() => {
    //                     navigation.navigate('Shopping List');
    //                 });
    //             }
    //         });
    //     }
    //     else if (type === 'instagram') {
    //         await promptInstaAsync().then((result: AuthSession.AuthSessionResult) => {
    //             if (result.type === 'success') {
    //                 const { accessToken } = result.authentication as AuthSession.TokenResponseConfig;
    //                 // Store the token and navigate to the next screen
    //                 storeData(accessToken).then(() => {
    //                     navigation.navigate('Shopping List');
    //                 });
    //             }
    //         });
    //     }
    //     else if (type === 'tiktok') {
    //         await promptTiktokAsync().then((result: AuthSession.AuthSessionResult) => {
    //             if (result.type === 'success') {
    //                 const { accessToken } = result.authentication as AuthSession.TokenResponseConfig;
    //                 // Store the token and navigate to the next screen
    //                 storeData(accessToken).then(() => {
    //                     navigation.navigate('Shopping List');
    //                 });
    //             }
    //         });
    //     }
    // }

    if (isLoading) {
        console.log("Loading...");
        return <LoadingIndicator displayText={"Signing you in..."} />;
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
                    value={login.email}
                    onSubmitEditing={() => inputRef.current?.focus()}
                    returnKeyType="next"
                    selectionColor={theme.textSecondary}
                    autoCapitalize="none"
                    autoCorrect={false}
                    textContentType="username"
                    onChange={e => setLogin({...login, email: e.nativeEvent.text })}
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
                        onPress={() => navigation.navigate('ForgotPassword')}
                        style={styles.justified}
                    >
                        <TextSecondary style={[styles.header3]}>Forgot Password?</TextSecondary>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignUp}
                        style={styles.justified}
                    >
                        <TextSecondary style={[styles.header3, { paddingBottom: 0 }]}>Sign Up</TextSecondary>
                    </TouchableOpacity>
                    <View style={[styles.separator]}></View>
                    <View>
                        <TextSecondary style={[styles.header3, { lineHeight: 8 }]}>Or</TextSecondary>
                    </View>
                    <View style={[styles.flexRow, styles.justified]}>
                        <TouchableOpacity style={styles.iconSelection} 
                            // onPress={() => handleOAuthSignIn('facebook')}
                        >
                            <FontAwesome name="facebook-f" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconSelection} 
                            // onPress={() => handleOAuthSignIn('instagram')}
                        >
                            <FontAwesome name="instagram" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconSelection} 
                            // onPress={() => handleOAuthSignIn('tiktok')}
                        >
                            <FontAwesome5 name="tiktok" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SecondaryView>
    );
};