import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemMain from './ItemMain';
import ItemInfo from './ItemInfo';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import { useAppSelector } from '@/app/store/hooks';

export default function Items() {
  // Load categories
  const ItemsStack = createNativeStackNavigator();
  const theme = useAppSelector(state => state.theme);

  return (
    <ItemsStack.Navigator>
      <ItemsStack.Screen
        name="ItemMain"
        component={ItemMain}
        options={{
          headerShown: true,
          headerRight: () => <SearchBarWidget componentToRender={"ItemSearchModal"} />,
          headerStyle: {
            // backgroundColor: Colors[colorScheme ?? 'light'].background,
            backgroundColor: theme.colors.background,
          },
          headerTitle: 'Products',
          headerTitleStyle: {
            // color: Colors[colorScheme ?? 'light'].text,
            color: 'white',
          },
        }}
      />
      <ItemsStack.Screen
        name="ItemInfo"
        component={ItemInfo}
        options={{
          headerShown: false,
        }}
      />
    </ItemsStack.Navigator>
  );
};
