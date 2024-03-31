import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { styles } from './Theme';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OutletProps {
  children: ReactNode; 
}

const Outlet: React.FC<OutletProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
        <LinearGradient colors={
            ['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.5)']
        } style={styles.container}>
            {children}
        </LinearGradient>
    </SafeAreaView>
  );
};

export default Outlet;
