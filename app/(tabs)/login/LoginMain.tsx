import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

export default function LoginMain(){
  const ItemsStack = createNativeStackNavigator();
    return (
        <ItemsStack.Navigator>
            <ItemsStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <ItemsStack.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: false,
                }}
            />
            <ItemsStack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: false,
                }}
            />
        </ItemsStack.Navigator>
    )
}