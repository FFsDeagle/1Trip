import { styles } from '@/components/util/Theme';
import { View } from '@/components/Themed';
import { useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ListItem } from '@rneui/base';
import { Link } from 'expo-router';
import InventoryCategoryWidget from '@/components/widgets/inventory/InventoryCategoryWidget';
import SearchBarWidget from '@/components/widgets/misc/SearchBar';

export default function Inventory() {

  // Load categories
  useEffect(() => {

  },[])

  return (
    <View style={styles.container}>
      <InventoryCategoryWidget />
      <Text>
        Test
      </Text>
    </View>
  );
};
