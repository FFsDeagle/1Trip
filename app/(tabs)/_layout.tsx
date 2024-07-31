import FontAwesome from '@expo/vector-icons/FontAwesome';
import { styles } from '@/components/util/Theme';
import { useColorScheme } from '@/components/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inventory from './inventory/Inventory';
import Login from '@/app/(tabs)/login/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shopping from './shopping/Shopping';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import { useEffect, useState } from 'react';
import ItemMain from './items/ItemMain';
import { defaultTheme, getTheme, ThemeProps } from './themeSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

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
  const showInventoryHeader = useAppSelector(state => state.inventory.showHeader);
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
  }, [themeState])

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'lightblue',
          tabBarInactiveTintColor: '#24666E',
          tabBarStyle: {
            backgroundColor: '#0D2327',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          // headerShown: useClientOnlyValue(false, true),
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
            }}
          />
          <Tab.Screen 
            name="Shopping List"
            component={Shopping} 
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="shopping-cart" color={color} />,
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
          <Tab.Screen 
            name="Inventory"
            component={Inventory} 
            options={{
              headerShown: showInventoryHeader,
              headerRight: () => <SearchBarWidget componentToRender={"SearchResultsModal"} />,
              tabBarIcon: ({ color }) => <TabBarIcon name="archive" color={color} />,
              headerStyle: {
                // backgroundColor: Colors[colorScheme ?? 'light'].background,
                backgroundColor: '#0D2327',
                elevation: 2,
                shadowOffset: { width: 0, height: 10 },
                shadowColor: 'black',
              },
              headerTitleStyle: {
                // color: Colors[colorScheme ?? 'light'].text,
                color: 'white',
              },
            }}
          />
          <Tab.Screen 
            name="Items"
            component={ItemMain} 
            options={{
              headerShown: showInventoryHeader,
              headerRight: () => <SearchBarWidget componentToRender={"SearchResultsModal"} />,
              tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
              headerStyle: {
                // backgroundColor: Colors[colorScheme ?? 'light'].background,
                backgroundColor: '#0D2327',
                elevation: 2,
                shadowOffset: { width: 0, height: 10 },
                shadowColor: 'black',
              },
              headerTitleStyle: {
                // color: Colors[colorScheme ?? 'light'].text,
                color: 'white',
              },
            }}
          />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
