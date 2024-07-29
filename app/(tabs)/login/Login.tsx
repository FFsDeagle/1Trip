import { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, Text } from "../../../components/Themed";
import { Input, Button } from '@rneui/themed';
import { styles } from "@/components/util/Theme";
import { LinearGradient } from "expo-linear-gradient";

export default function Login ({ navigation }: { navigation: any }){
    const [isLoading, setIsLoading] = useState(false);

    // Check users login status by passing their id to the server
    // Which then checks the session by the token

    // Todo - hide signin button when keyboard is active
    useEffect(() => {
        
    },[])

    if(isLoading){
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <LinearGradient 
                style={[styles.container, {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}
                colors={['#184E68', '#57CA85']}
            >
            <Text style={{
                fontSize: 50,
                color: 'white',
                marginBottom: 50,
            }}>1Trip</Text>
            <Input
                style={{
                    color: 'white',
                }}
                placeholder="Username"
            />
            <Input
                placeholder="Password"
            />
            <TouchableOpacity
                onPress={() => {
                    // navigate to other tab
                    navigation.navigate('Shopping List');
                }}
                style={{
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: 5,
                    borderRadius: 50,
                }}
                accessibilityLabel="Learn more about this purple button"
            >
                <Text style={[styles.textStyle, {color: 'white'}]}>Sign In</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};