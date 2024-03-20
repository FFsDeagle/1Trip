import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabOneScreen from '.';
import TabTwoScreen from './two';
import TabThreeScreen from './three';
import TabFourScreen from './four';

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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
        <Tab.Screen 
          name="Home" 
          component={TabOneScreen} 
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            tabBarIconStyle: { marginBottom: 0 },
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
          name="Two" 
          component={TabTwoScreen} 
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="file" color={color} />,
          }}
        />
        <Tab.Screen
          name="Three" 
          component={TabThreeScreen} 
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
          }}
        />
        <Tab.Screen 
          name="Four" 
          component={TabFourScreen} 
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="square" color={color} />,
          }}
        />
        <Tab.Screen 
          name="Five" 
          component={TabFourScreen} 
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="address-book-o" color={color} />,
          }}
        />
    </Tab.Navigator>
  );
}
