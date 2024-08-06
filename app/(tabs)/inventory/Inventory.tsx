import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryMain from './InventoryMain';
import InventoryItemInfo from './InventoryItemInfo';
import AddItem from './AddItem';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import { useAppSelector } from '@/app/store/hooks';

export default function Inventory() {
  // Load categories
  const InventoryStack = createNativeStackNavigator();
  const theme = useAppSelector(state => state.theme);
  
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryMain"
        component={InventoryMain}
        options={{
          headerShown: true,
          headerTitle: 'Inventory',
          headerRight: () => <SearchBarWidget componentToRender={"SearchResultsModal"} />,
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
        component={InventoryItemInfo}
        options={{
          headerShown: false,
        }}
      />
      <InventoryStack.Screen
        name="AddItem"
        component={AddItem}
        options={{
          headerShown: false,
        }}
      />
    </InventoryStack.Navigator>
  );
};
