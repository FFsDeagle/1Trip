import { useState } from 'react';
import { useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { componentMap } from './(tabs)/modals/ModalMap';
import { View } from 'react-native';

export default function ModalScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { modal, title, navigationParam } = params;
  
  const [Component, setComponent] = useState<React.JSX.Element | null>(null);

  useEffect(() => {
    // Use the componentMap function to render the correct modal
    const component = componentMap(modal as string, navigationParam as string);
    setComponent(component);
  }, []);


  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: '#0D2327',
        elevation: 2,
        shadowOffset: { width: 0, height: 10 },
        shadowColor: 'black',
        marginTop: 10,
      },
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    })
  },[])

  return (
    <View>
        {Component}
    </View>
  );
}