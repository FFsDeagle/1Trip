import { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { Text } from "react-native";
import { Input } from '@rneui/themed';
import { styles } from "@/components/util/Theme";
import { LinearGradient, SecondaryView, TextPrimary, TextSecondary } from "@/components/Themed";
import { useAppSelector } from "@/app/store/hooks";
import { FontAwesome5 } from "@expo/vector-icons";

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
            }}>
                <Input
                    style={{
                        color: 'white',
                    }}
                    placeholder="Password"
                />
            </SecondaryView>
                {!isKeyboardVisible && 
                    <LinearGradient
                        colors={[]}
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            padding: 5,
                            borderRadius: 50,
                        }}
                    >
                    <TouchableOpacity
                        onPress={() => {
                        // navigate to other tab
                        navigation.navigate('Shopping List');
                        }}

                        accessibilityLabel="Learn more about this purple button"
                    >
                    <Text style={[styles.textStyle, {color: 'white'}]}>Sign In</Text>
                </TouchableOpacity>
            </LinearGradient>
            }
        </SecondaryView>
    );
};