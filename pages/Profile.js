import React from 'react';
import { View } from 'react-native';
import Profile from '../components/profile/Index';

export default function ProfileScreen({ navigation }) {

  console.log('Pages Profile');

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Profile navigation={navigation} />
    </View>
  );
}