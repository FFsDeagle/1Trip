import { styles } from '@/components/util/Theme';
import { Text, View } from '@/components/Themed';

export default function Shopping() {
  return (
    <View style={styles.container}>
        <View style={{
          height: 600,
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
