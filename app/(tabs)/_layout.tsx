import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { styles } from '@/components/util/Theme';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Reports from './reports/Reports';
import Account from './account/Account';
import Inventory from './inventory/Inventory';
import Login from '@/app/(tabs)/login/Login';
import Dashboard from '@/app/(tabs)/dashboard/Dashboard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
        }}>
          <Tab.Screen 
            name="Login" 
            component={Login} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={color} />,
              tabBarIconStyle: { marginBottom: 0 },
              tabBarStyle: { display: 'none' }, // Display tab in login screen
              headerShown: false, // Hide the header in the login screen
              tabBarButton: () => null, // Hide the tab button on the navigation bar
              headerRight: () => (
                <Link href="/modal" asChild>
                  <Pressable>
                    {({ pressed }) => (
                      <FontAwesome
                        name="info-circle"
                        size={25}
                        color={Colors[colorScheme ?? 'light'].text}
                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                      />
                    )}
                  </Pressable>
                </Link>
              )
            }}
          />
          <Tab.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
          />
          <Tab.Screen
            name="Reports" 
            component={Reports} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
            }}
          />
          <Tab.Screen 
            name="Inventory" 
            component={Inventory} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
            }}
          />
          <Tab.Screen 
            name="Account" 
            component={Account} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="address-book-o" color={color} />,
            }}
          />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
