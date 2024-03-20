import { StyleSheet } from 'react-native';
import { Text, View } from '../Themed';
import { Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(10,0,27,1)', 'rgba(0,0,0,1)']}
        style={styles.container}
      >
        <View style={styles.getStartedContainer}>
          <Text style={styles.getStartedText}>
            Welcome to 1Trip!
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  getStartedText: {
    fontSize: 24,
    lineHeight: 24,
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});
