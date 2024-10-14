import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from '@/components/util/Theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inventory from './inventory/Inventory';
import Login from '@/app/(tabs)/login/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shopping from './shopping/Shopping';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import { useEffect, useState } from 'react';
import { defaultTheme, getTheme, ThemeProps } from '../../components/util/themeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ActivityIndicator } from 'react-native';
import Items from './items/Items';
import LoginMain from './login/LoginMain';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const Tab = createBottomTabNavigator();
export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const themeState = useAppSelector(state => state.theme);

  // Theme handler, set to default theme
  const [theme, setTheme] = useState<ThemeProps>(defaultTheme);

  // useEffect on mount to make api call to get saved theme
  useEffect(() => {
    dispatch(getTheme());
    if (themeState.status === 'success') {
      setTheme(themeState);
    }
  }, [])

  if (themeState.status === 'loading') {
    return (
      // load spinner
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: theme.colors.tint,
          tabBarInactiveTintColor: theme.colors.tabActive,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: theme.colors.background,//'#0D2327',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          // headerShown: useClientOnlyValue(false, true),
        }}>
          <Tab.Screen 
            name="LoginMain" 
            component={LoginMain} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="dashboard" color={theme.colors.iconColor2 ? theme.colors.iconColor2 : color } />,
              tabBarIconStyle: { marginBottom: 0 },
              tabBarStyle: { display: 'none' }, // Display tab in login screen
              headerShown: false, // Hide the header in the login screen
              tabBarButton: () => null, // Hide the tab button on the navigation bar
            }}
          />
          <Tab.Screen 
            name="Shopping List"
            component={Shopping} 
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={theme.colors.iconColor2 ? theme.colors.iconColor2 : color } />,
              headerStyle: {
                // backgroundColor: Colors[colorScheme ?? 'light'].background,
                backgroundColor: theme.colors.background,
                elevation: 2,
                shadowOffset: { width: 0, height: 10 },
                shadowColor: 'black',
              },
              headerTitleStyle: {
                // color: Colors[colorScheme ?? 'light'].text,
                color: theme.colors.primary,
              },
            }}
          />
          {/* <Tab.Screen 
            name="Inventory"
            component={Inventory} 
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <TabBarIcon name="archive" color={theme.colors.iconColor2 ? theme.colors.iconColor2 : color } />,
            }}
          /> */}
          <Tab.Screen 
            name="Products"
            component={Items} 
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <TabBarIcon name="square" color={theme.colors.iconColor2 ? theme.colors.iconColor2 : color } />,
            }}
          />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
