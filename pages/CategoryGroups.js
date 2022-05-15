import React from 'react';
import { Dimensions, View } from 'react-native';
import Index from "../components/groupsByCategory/Index";

export default function CategoryGroupScreen({ route, navigation }) {

  console.log('Pages CategoryGroup');

  const { category } = route.params;

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#fff', width: Dimensions.get('window').width }}>
      <Index category={category} navigation={navigation} />
    </View>
  );
}
