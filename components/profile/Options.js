import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GlobalContext from "../global/context";

export default function Options({ navigation }) {

  console.log("components profile Options");

  const { removeAuthentication } = useContext(GlobalContext);

  return (
    <View>
      <View>
        <View style={{ alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Opciones</Text>
        </View>
        <View style={{ borderBottomColor: '#CDCDCD', borderWidth: 0.3 }}></View>
      </View>
      <View style={{ flexDirection: 'column', marginTop: '5%' }}>
        <TouchableOpacity onPress={() => { navigation.navigate('New Group') }}>
          <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
            <MaterialCommunityIcons name="account-multiple-plus-outline" size={25} color="#4285F4" style={{ marginRight: 15 }} />
            <Text style={{ fontSize: 17, color: '#000000' }}>Crear Grupo</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
            <Ionicons name="settings-outline" size={25} color="#4285F4" style={{ marginRight: 15 }} />
            <Text style={{ fontSize: 17, color: '#000000' }}>Configuración</Text>
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => { removeAuthentication() }}>
          <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
            <MaterialCommunityIcons name="logout-variant" size={25} color="#4285F4" style={{ marginRight: 15 }} />
            <Text style={{ fontSize: 17, color: '#000000' }}>Cerrar Sesión</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
