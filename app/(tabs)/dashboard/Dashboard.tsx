import { styles } from '@/components/util/Theme';
import { Text, View } from '../../../components/Themed';

export default function Dashboard() {
  return (
    <View style={styles.container}>
        <View style={styles.card01}>
            <View style={styles.cardContainer}>
              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Dashboard</Text>
              </View>
            </View>
        </View>
    </View>
  );
};