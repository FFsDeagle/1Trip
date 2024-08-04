import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryMain from './InventoryMain';
import InventoryItemInfo from './InventoryItemInfo';
import AddItem from './AddItem';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';

export default function Inventory() {
  // Load categories
  const InventoryStack = createNativeStackNavigator();
  
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryMain"
        component={InventoryMain}
        options={{
          headerShown: true,
          headerRight: () => <SearchBarWidget componentToRender={"SearchResultsModal"} />,
          headerStyle: {
            // backgroundColor: Colors[colorScheme ?? 'light'].background,
            backgroundColor: '#0D2327',
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
