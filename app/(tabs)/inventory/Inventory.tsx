import { styles } from '@/components/util/Theme';
import { View } from '@/components/Themed';
import { useEffect } from 'react';
import { FlatList } from 'react-native';
import { FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/base';
import { Link, useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/components/util/Types';

export default function Inventory() {
  const navigate = useNavigation<NavigationProp<RootStackParamList>>();
  const categories = [
    {
      id: 0,
      name: "Dairy",
      icon: "cow",
      fontType: FontAwesome6,
    },
    {
      id: 1,
      name: "Meat",
      icon: "food-steak",
      fontType: MaterialCommunityIcons,
    },
    {
      id: 2,
      name: "Produce",
      icon: "leaf",
      fontType: FontAwesome6,
    },
    {
      id: 3,
      name: "Frozen",
      icon: "snowflake",
      fontType: FontAwesome6,
    },
    {
      id: 4,
      name: "Beverages",
      icon: "coffeescript",
      fontType: Fontisto,
    },
    {
      id: 5,
      name: "Canned",
      icon: "jar",
      fontType: FontAwesome6,
    },
    {
      id: 6,
      name: "Bakery",
      icon: "bread-slice",
      fontType: FontAwesome6,
    },
    {
      id: 7,
      name: "Pantry",
      icon: "library-shelves",
      fontType: MaterialCommunityIcons,
    },
    {
      id: 8,
      name: "Snacks",
      icon: "cookie",
      fontType: FontAwesome6,
    },
    {
      id: 9,
      name: "Household",
      icon: "emoji-food-beverage",
      fontType: MaterialIcons,
    },
    {
      id: 10,
      name: "Personal Care",
      icon: "soap",
      fontType: FontAwesome6,
    },
    {
      id: 11,
      name: "Miscellaneous",
      icon: "other-houses",
      fontType: MaterialIcons,
    }
  ]
  // Load categories
  useEffect(() => {

  },[])

  return (
    <View style={styles.container}>
        <View style={styles.card01}>
            <View style={styles.cardContainer}>
              <View style={styles.viewStyle}>
                <FlatList
                    data={categories}
                    numColumns={4} 
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    renderItem={({ index, item }) => (
                      <Link 
                        href={{
                          pathname: "/modal",
                          params: { data: 'DisplayCategory', title: `${item.name}` }, // Params to determine modal to render
                      }}
                        asChild
                      >
                        <TouchableOpacity
                            style={{
                                width: 75,
                                margin: 5,
                            }}
                            key={index}
                        >
                            <View
                                style={styles.gridItem}
                            >
                                <item.fontType
                                    name={item.icon as any}
                                    size={30}
                                    color={'#0D2327'}
                                />
                                <ListItem.Title style={[styles.description, {color: '#0D2327'}]}>
                                    {item.name}
                                </ListItem.Title>
                            </View>
                        </TouchableOpacity>
                      </Link>
                    )}/>
              </View>
            </View>
        </View>
    </View>
  );
};
