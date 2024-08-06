import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingMain from './ShoppingMain';
import { useAppSelector } from '@/app/store/hooks';
import AddNewShoppingList from './AddNewShoppingList';
import CreateShoppingList from './CreateShoppingList';
import ViewShoppingList from './ViewShoppingList';
import StartShopping from './StartShopping';

export default function Items() {
  // Load categories
  const ItemsStack = createNativeStackNavigator();
  const theme = useAppSelector(state => state.theme);
  const shoppingLists = useAppSelector(state => state.shoppingLists.lists);

  return (
    <ItemsStack.Navigator>
      <ItemsStack.Screen
        name="ShoppingMain"
        component={ShoppingMain}
        options={{
          headerTitle: 'Shopping Lists',
          headerShown: true,
          headerRight: () => <AddNewShoppingList />,
          headerStyle: {
            // backgroundColor: Colors[colorScheme ?? 'light'].background,
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            // color: Colors[colorScheme ?? 'light'].text,
            color: theme.colors.headerTitleColor,
          },
        }}
      />
      <ItemsStack.Screen
        name="CreateShoppingList"
        component={CreateShoppingList}
        options={{
          headerShown: false,
        }}
      />
      <ItemsStack.Screen
        name="ViewShoppingList"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.tint,
          headerTitleStyle: {
            color: theme.colors.headerTitleColor,
          },
        }}
      >
        {(props: any) => <ViewShoppingList {...props} />}
      </ItemsStack.Screen>
      <ItemsStack.Screen
        name="StartShopping"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.tint,
          headerTitleStyle: {
            color: theme.colors.headerTitleColor,
          },
        }}
      >
        {(props: any) => <StartShopping {...props} />}
      </ItemsStack.Screen>
    </ItemsStack.Navigator>
  );
};
