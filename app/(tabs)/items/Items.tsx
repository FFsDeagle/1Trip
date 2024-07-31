import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemMain from './ItemMain';

export default function Items() {
  // Load categories
  const InventoryStack = createNativeStackNavigator();

  return (
    <InventoryStack.Navigator>
      <InventoryStack.Screen
        name="ItemMain"
        component={ItemMain}
        options={{
          headerShown: false,
        }}
      />
    </InventoryStack.Navigator>
  );
};
