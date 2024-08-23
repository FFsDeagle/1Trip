import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ShoppingMain from './ShoppingMain';
import { useAppSelector } from '@/app/store/hooks';
import AddNewShoppingList from './AddNewShoppingList';
import CreateShoppingList from './shoppinglist/CreateShoppingList';
import ViewShoppingList from './ViewShoppingList';
import StartShopping from './StartShopping';
import ViewShoppingListType from './ViewShoppingListType';
import Config from '../settings/Settings';
import ViewHistoryList from './ViewHistoryList';

export default function Items() {
  // Load categories
  const ItemsStack = createNativeStackNavigator();
  const theme = useAppSelector(state => state.theme);
  const shoppingLists = useAppSelector(state => state.shoppingLists.lists);
  const { SettingsIcon, Settings } = Config;

  return (
    <ItemsStack.Navigator>
      <ItemsStack.Screen
        name="ShoppingMain"
        component={ShoppingMain}
        options={{
          headerTitle: 'Shopping Lists',
          headerShown: true,
          headerRight: () => <SettingsIcon />,
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
        options={{
          headerShown: false,
        }}
      >
        {(props: any) => <CreateShoppingList {...props} />}
      </ItemsStack.Screen>
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
          headerTitle: "Start Shopping",
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
      <ItemsStack.Screen
        name="ViewShoppingListType"
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
        {(props: any) => <ViewShoppingListType {...props} />}
      </ItemsStack.Screen>
      <ItemsStack.Screen
        name="Settings"
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
        component={Settings}
      />
      <ItemsStack.Screen
        name="ViewHistoryList"
        options={{
          headerShown: true,
          headerTitle: "History List",
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTintColor: theme.colors.tint,
          headerTitleStyle: {
            color: theme.colors.headerTitleColor,
          },
        }}
      >
        {(props: any) => <ViewHistoryList {...props} />}
      </ItemsStack.Screen>
    </ItemsStack.Navigator>
  );
};
