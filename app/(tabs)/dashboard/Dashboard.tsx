import { styles } from '@/components/util/Theme';
import { Text, View } from '../../../components/Themed';
import MenuGridWidget from '@/components/widgets/dashboard/MenuGridWidget';

export default function Dashboard() {
  return (
    <View style={styles.container}>
        <MenuGridWidget />
        {/* more widgets or cards to add below */}
    </View>
  );
};