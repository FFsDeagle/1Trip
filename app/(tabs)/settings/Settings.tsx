import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { SecondaryView, TextSecondary, TouchableOpacity } from "@/components/Themed";
import { styles } from "@/components/util/Theme";
import { LoginStackParamList, ShoppingStackParamList } from "@/constants/types";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { FlatList, View } from "react-native";
import { logoutAsync } from "../login/loginSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsIcon = () => {
    const theme = useAppSelector(state => state.theme);
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList, 'ShoppingMain'>>();

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        style={{
            backgroundColor: 'transparent'
        }}
    >
        <AntDesign 
            name="setting" 
            size={24} 
            color={theme.colors.iconColor2}
        />
    </TouchableOpacity>
  )
}

function Settings(){
    const navigation = useNavigation<NavigationProp<ShoppingStackParamList, 'ShoppingMain'>>();
    const navigationLogin = useNavigation<NavigationProp<LoginStackParamList, 'Login'>>();
    const { id, token } = useAppSelector(state => state.login.loginResponse);
    const storageKey = process.env.EXPO_PUBLIC_STORAGE_KEY;
    const dispatch = useAppDispatch();

    const handleSelection = async (selection: string) => {
        console.log('Selection: ', selection);
        switch(selection){
            case 'About':
                //navigation.navigate('About');
                break;
            case 'Themes':
                //navigation.navigate('Themes');
                break;
            case 'Notifications':
                //navigation.navigate('Notifications');
                break;
            case 'Log out':
                // Clear token from local storage and logout
                if (storageKey) {
                    await AsyncStorage.setItem(storageKey, '');
                }
                await dispatch(logoutAsync(id));
                navigationLogin.navigate('Login');
                break;
            default:
                break;
        }
    }

    return (
        <SecondaryView style={styles.container}>
            <FlatList
                data={[
                    // { key: 'About' },
                    // { key: 'Themes', },
                    // { key: 'Notifications' },
                    { key: 'Log out' },
                ]}
                renderItem={({ item }) => <TouchableOpacity onPress={() => handleSelection(item.key)} style={styles.listItem}><TextSecondary style={styles.title}>{item.key}</TextSecondary></TouchableOpacity>}
            />
        </SecondaryView>
    )
}

export default { Settings, SettingsIcon };