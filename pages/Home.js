import React from 'react';
import { StyleSheet, View } from 'react-native';
import Index from "../components/home/Index";

export default function HomeScreen({ navigation }) {

  console.log('Pages Home');

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
