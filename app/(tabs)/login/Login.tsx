import { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import { View, Text } from "../../../components/Themed";
import { Input, Button } from '@rneui/themed';
import { styles } from "@/components/util/Theme";

export default function Login ({ navigation }: { navigation: any }){
    const [isLoading, setIsLoading] = useState(false);

    // Check users login status by passing their id to the server
    // Which then checks the session by the token
    useEffect(() => {
        
    },[])

    if(isLoading){
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <View style={[styles.justified, styles.container]}>
            <Text style={styles.textStyle}>1Trip</Text>
            <Input
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
                style={styles.textStyle}
                accessibilityLabel="Learn more about this purple button"
            >
                <Text style={styles.textStyle}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};