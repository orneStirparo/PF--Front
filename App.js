import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "./utils/AsyncStorage";
import GlobalContext from "./components/global/context";
import { BottomTabNavigator } from './navigation/TabNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LoginStackNavigator } from "./navigation/StackNavigation";

export default function App() {

  console.log('App');

  const [login, setLogin] = useState(false);
  const [authData, setAuthData] = useState({
    _id: null,
    email: null,
    name: null,
    image_profile: null,
    groups_following: [],
    groups_requested: [],
    groups_created: [],
    token: null,
    iniciar: (user) => {
      setAuthData({
        ...authData,
        _id: user._id,
        email: user.email,
        name: user.name,
        image_profile: user.image_profile,
        groups_following: user.groups_following,
        groups_requested: user.groups_requested,
        groups_created: user.groups_created,
        token: user.token,
      })
    }
  });

  const checkUser = async () => {
    const user = await AsyncStorage.getData('@userData');
    if (user) {
      setLogin(true);
      authData.iniciar(user);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const applyAuthentication = (user) => {
    AsyncStorage.storeData('@userData', user);
    checkUser();
  };

  const removeAuthentication = () => {
    AsyncStorage.clearAll();
    authData.iniciar({
      _id: null,
      email: null,
      name: null,
      image_profile: null,
      groups_following: [],
      groups_requested: [],
      groups_created: [],
      token: null,
    });
  };

  return (
    <GlobalContext.Provider value={{ authData, removeAuthentication, applyAuthentication }}>
      <SafeAreaProvider>
        <NavigationContainer>
          {
            (!authData._id) ?
              <LoginStackNavigator />
              :
              <BottomTabNavigator />
          }
        </NavigationContainer>
      </SafeAreaProvider>
    </GlobalContext.Provider>
  );
}
