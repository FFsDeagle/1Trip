import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryMain from './InventoryMain';
import InventoryItemInfo from './InventoryItemInfo';
import AddItem from './AddItem';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import { useAppSelector } from '@/app/store/hooks';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { InventoryStackParamList } from '@/constants/types';
import { FontAwesome6 } from '@expo/vector-icons';
import InventorySearch from './InventorySearch';

export default function Inventory() {
  // Load categories
  const InventoryStack = createNativeStackNavigator();
  const theme = useAppSelector(state => state.theme);
  const navigation = useNavigation<NavigationProp<InventoryStackParamList>>();
  
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryMain"
        component={InventoryMain}
        options={{
          headerShown: true,
          headerTitle: 'Inventory',
          headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('ItemSearch', { nav: 'InventoryItemInfo', placeholder: "Search your inventory.."})}>
              <FontAwesome6 name="magnifying-glass" size={24} color="white" />
            </TouchableOpacity>,
          headerStyle: {
            // backgroundColor: Colors[colorScheme ?? 'light'].background,
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            // color: Colors[colorScheme ?? 'light'].text,
            color: 'white',
          },
        }}
      />
      <InventoryStack.Screen
        name="InventoryItemInfo"
        options={{
          headerShown: false,
        }}
      >
        {(props: any) => <InventoryItemInfo {...props} />}
      </InventoryStack.Screen>
      <InventoryStack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      />
      <InventoryStack.Screen
        name="ItemSearch"
        options={{
          headerShown: false,
          animation: 'fade_from_bottom',
        }}
      >
        {(props: any) => <InventorySearch {...props} />}
      </InventoryStack.Screen>
    </InventoryStack.Navigator>
  );
};
