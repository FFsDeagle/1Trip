import { styles } from '@/components/util/Theme';
import { View } from '@/components/Themed';
import { useEffect } from 'react';
import { FlatList, Text } from 'react-native';
import { FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import InventoryCategoryWidget from '@/components/widgets/inventory/InventoryCategoryWidget';

export default function Inventory() {
  // Load categories
  useEffect(() => {

  },[])
  
  return (
    <View style={styles.container}>
      <InventoryCategoryWidget />
      <View style={{
          height: 300,
          backgroundColor: 'black',
        }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                marginTop: 20,
              }}
            >
              More widgets or cards to add here
            </Text>
        </View>
    </View>
  );
};
