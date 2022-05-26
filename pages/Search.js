import React from 'react';
import { View } from 'react-native';
import Index from "../components/search/Index";

export default function SearchScreen({ navigation }) {

  console.log('Pages Search');

  return (
    <View>
      <Index navigation={navigation} />
    </View>
  );
}