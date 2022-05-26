import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Index from "../components/home/Index";

export default function HomeScreen({ navigation }) {

  console.log('Pages Home');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title='Menu'
          onPress={() => navigation.toggleDrawer()}
        />
      )
    })
  }, [])

  return (
    <View style={styles.container}>
      <Index navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  }
});
