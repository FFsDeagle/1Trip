import { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator, Keyboard, View } from 'react-native';
import { Input } from '@rneui/themed';
import { styles } from "@/components/util/Theme";
import { LinearGradient, LinearGradientSecondary, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { useAppSelector } from "@/app/store/hooks";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function Login ({ navigation }: { navigation: any }){
    const [isLoading, setIsLoading] = useState(false);
    const theme = useAppSelector(state => state.theme.colors);
    
    // Check users login status by passing their id to the server
    // Which then checks the session by the token

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

    const handleOAuthSignIn = () => {
        // Sign in with OAuth
        console.log('Sign in with OAuth');
    }

    if(isLoading){
        return <ActivityIndicator size="large" color="#0000ff" />;
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
                paddingTop: 15,
            }}>
                <Input
                    style={{
                        color: 'white',
                    }}
                    placeholder="Username"
                />
            </SecondaryView>
            <SecondaryView style={{
                width: '90%',
                backgroundColor: 'rgba(0,0,0,0.1)',
                borderRadius: 15,
                marginTop: 15,
                marginBottom: 25,
                paddingTop: 15,
            }}>
                <Input
                    style={{
                        color: 'white',
                    }}
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
                            onPress={() => {
                            // navigate to other tab
                                navigation.navigate('Shopping List');
                            }}
                            style={styles.justified}
                            accessibilityLabel="Learn more about this purple button"
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
                        <TouchableOpacity style={styles.iconSelection} onPress={handleOAuthSignIn}>
                            <FontAwesome name="facebook-f" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconSelection} onPress={handleOAuthSignIn}>
                            <FontAwesome name="instagram" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconSelection} onPress={handleOAuthSignIn}>
                            <FontAwesome5 name="tiktok" size={24} color={theme.iconColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </SecondaryView>
    );
};