import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ItemMain from './ItemMain';
import ItemInfo from './ItemInfo';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';
import { useAppSelector } from '@/app/store/hooks';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { ItemsStackParamList } from '@/constants/types';
import SearchComponent from '@/components/util/SearchComponent';
import ProductSearch from './ProductSearch';

export default function Items() {
  // Load categories
  const ItemsStack = createNativeStackNavigator();
  const theme = useAppSelector(state => state.theme);
  const navigation = useNavigation<NavigationProp<ItemsStackParamList>>();

  return (
    <ItemsStack.Navigator>
      <ItemsStack.Screen
        name="ItemMain"
        component={ItemMain}
        options={{
          headerShown: true,
          headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('ProductSearch', { nav: 'ItemInfo', placeholder: "Search for your Products.."})}>
              <FontAwesome6 name="magnifying-glass" size={24} color="white" />
            </TouchableOpacity>,
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
      <ItemsStack.Screen
        name="ProductSearch"
        options={{
          headerShown: false,
        }}
      >
        {(props: any) => <ProductSearch {...props} />}
      </ItemsStack.Screen>
    </ItemsStack.Navigator>
  );
};
