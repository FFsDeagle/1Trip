import { styles } from '@/components/util/Theme';
import { Text, View } from '@/components/Themed';

export default function Shopping() {
  return (
    <View style={styles.container}>
        <View style={styles.card01}>
            <View style={styles.cardContainer}>
              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Shopping</Text>
              </View>
            </View>
        </View>
    </View>
  );
};
