import React, { useState } from 'react';
import { View } from 'react-native';
import Index from '../components/groupInformation/Index';

export default function GroupInformationScreen({ route, navigation }) {

  console.log('Pages GroupInformation');

  const { group } = route.params;
  const [backgroundColor, setBackgroundColor] = useState('#fff');

  return (
    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: backgroundColor }}>
      <Index group={group} navigation={navigation} setBackgroundColor={setBackgroundColor} backgroundColor={backgroundColor} />
    </View>
  );
}