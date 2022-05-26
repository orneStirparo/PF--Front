import React, { useContext, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderUser from "../components/header/HeaderUser";
import provincias from "../utils/provincias/provincias.json";
import GlobalContext from "../components/global/context";
import Loading from "../components/loading/Loading";
import {postGroup} from "../utils/api";
import { Picker } from "@react-native-picker/picker";
import InpuText from "../components/TextInput/Index";
import BtnNext from "../components/Buttom/Index";

export default function CreateGroupScreeen({ navigation }) {

  console.log('Pages CreateGroup');

  provincias.provincias.sort((a, b) => {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    return 0
  })

  const { authData } = useContext(GlobalContext);
  const [userInfo, setUserInfo] = useState({
    name: '',
    category: '',
    visibility: '',
    city: '',
    town: '',
    whatsapp: null,
    instagram: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false)
  const { name, category, visibility, city, town, whatsapp, instagram } = userInfo;

  const isValidObjeField = (obj) => {
    return Object.values(obj).every(value => value.trim())
  }

  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    Alert.alert('Error', error);
    setTimeout(() => {
      stateUpdater('');
    }, 2500)
  }

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({
      ...userInfo,
      [fieldName]: value
    })
  }

  const isValidForm = () => {
    /* if (!isValidObjeField(userInfo))
        return updateError('Required all fields ', setError) */
    if (!name.trim() || name.length < 4)
      return updateError('Nombre Invalido, debe tener mas de 4 letras! ', setError)
    if (!category.trim() || category.length < 4)
      return updateError('Seleccionar categoria del grupo ', setError)
    if (!visibility.trim() || visibility.length < 4)
      return updateError('Seleccionar privacidad del grupo ', setError)
    if (!city.trim() || city.length < 4)
      return updateError('Seleccionar provincia del grupo ', setError)
    if (!town.trim() || town.length < 4)
      return updateError('Barrio invalido', setError)
    if (!whatsapp || whatsapp.toString().length < 13)
      return updateError('Whatsapp invalido, ingresa un número valido', setError)
    return true;
  }

  const sumbitForm = async () => {
    if (isValidForm()) {
      try {
        setLoading(true);
        const result = await postGroup(userInfo.name, userInfo.category, userInfo.visibility,
          userInfo.city, userInfo.town, authData.email, userInfo.whatsapp.toString(), userInfo.instagram, authData.token);
        if (result && result.success) {
          setUserInfo({
            name: '',
            category: '',
            visibility: '',
            city: '',
            town: '',
            whatsapp: null,
            instagram: '',
          });
          setError();
          setLoading(false);
          Alert.alert('Grupo creado con exito!');
        }
      } catch (error) {
        setLoading(false);
        console.log('error', error);
        if (error === 400)
          return updateError('El nombre del grupo ya existe', setError)
      }
    }
  }

  return (
    <Loading loading={loading}>
      <View style={styles.container}>
        <HeaderUser title={'Nuevo grupo deportivo'} navigation={navigation} visibleGoBack={true} />
        <ScrollView style={styles.scrollview}>
          {
            (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
          }

          <InpuText label={'Nombre'} placeholder="Introduzca nombre del grupo" value={name} autoCapitalize="words"
            onChangeText={(value) => handleOnChangeText(value, 'name')} />

          <Text style={styles.textPicker}>Categoria</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) => {
              handleOnChangeText(itemValue, 'category')
            }}>
            <Picker.Item label="Seleccione una opción..." value="0" />
            <Picker.Item label="Bikers" value="bikers" />
            <Picker.Item label="Runners" value="runners" />
            <Picker.Item label="Fitness" value="fitness" />
          </Picker>
          <View style={{ borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth }} />

          <Text style={styles.textPicker}>Privacidad</Text>
          <Picker
            selectedValue={visibility}
            onValueChange={(itemValue, itemIndex) => {
              handleOnChangeText(itemValue, 'visibility')
            }}>
            <Picker.Item label="Seleccione una opción..." value="0" />
            <Picker.Item label="Publico" value="public" />
            <Picker.Item label="Privado" value="private" />
          </Picker>
          <View style={{ borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth }} />

          <Text style={styles.textPicker}>Provincia</Text>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => {
              handleOnChangeText(itemValue, 'city')
            }}>
            <Picker.Item label="Seleccione una opción..." value="" />
            {
              provincias.provincias.map((item, index) => {
                return (
                  <Picker.Item label={item.nombre} value={item.nombre} key={index} />
                )
              })
            }
          </Picker>
          <View style={{ borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth }} />

          <InpuText label={'Barrio'} placeholder="Introduzca barrio de la provincia" value={town} autoCapitalize="words"
            onChangeText={(value) => handleOnChangeText(value, 'town')} />

          <InpuText label={'Whatsapp'} placeholder="ejemplo: 5491136254985" value={whatsapp} autoCapitalize="words"
            onChangeText={(value) => handleOnChangeText(value, 'whatsapp')} keyboardType='numeric' />

          <InpuText label={'Instagram'} placeholder="nombre de usuario ejemplo: hanuka.ar" value={instagram} autoCapitalize="none"
            onChangeText={(value) => handleOnChangeText(value, 'instagram')} />

          <BtnNext activeOpacity={0.8} title="Crear Grupo" onPress={() => sumbitForm()} />
        </ScrollView>
      </View>
    </Loading>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollview: {
    paddingHorizontal: 20,
  },
  textPicker: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
});
