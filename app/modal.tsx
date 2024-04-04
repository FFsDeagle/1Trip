import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import { useState } from 'react';
import { View } from '@/components/Themed';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { componentMap } from './(tabs)/modals/ModalMap';

export default function ModalScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [Component, setComponent] = useState<React.JSX.Element | null>(null);

  const { data, title } = params;

  useEffect(() => {
    // Use the componentMap function to render the correct modal
    const component = componentMap(data as string);
    setComponent(component);
  }, []);


  useEffect(() => {
    navigation.setOptions({
      title: title,
    })
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.topMargin} />
        {Component}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topMargin: {
    marginTop: 20,
    width: '100%',
  },
  separator: {
    height: 1,
    width: '90%',
  },
});