import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import ShoppingMain from './ShoppingMain';

export default function Items() {
  // Load categories
  const ItemsStack = createNativeStackNavigator();

  return (
    <ItemsStack.Navigator>
      <ItemsStack.Screen
        name="ShoppingMain"
        component={ShoppingMain}
        options={{
          headerShown: true,
          headerRight: () => <SearchBarWidget componentToRender={"ItemSearchModal"} />,
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
    </ItemsStack.Navigator>
  );
};
