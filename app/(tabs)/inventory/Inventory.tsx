import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InventoryMain from './InventoryMain';
import InventoryItemInfo from './InventoryItemInfo';
import { View, Text } from 'react-native';

export default function Inventory() {
  // Load categories
  const InventoryStack = createNativeStackNavigator();
  useEffect(() => {

  },[])
  
  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="InventoryMain"
        component={InventoryMain}
        options={{
          headerShown: false,
        }}
      />
      <InventoryStack.Screen
        name="InventoryItemInfo"
        component={InventoryItemInfo}
        options={{
          headerShown: false,
        }}
      />
    </InventoryStack.Navigator>
  );
};
