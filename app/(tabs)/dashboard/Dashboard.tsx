import { styles } from '@/components/util/Theme';
import { Text, View } from '../../../components/Themed';
import MenuGridWidget from '@/components/widgets/dashboard/MenuGridWidget';

export default function Dashboard() {
  return (
    <View style={styles.container}>
        <MenuGridWidget />
        {/* more widgets or cards to add below */}
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