import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator, SearchStackNavigator, NotificationStackNavigator, ProfileStackNavigator, LoginStackNavigator } from "./StackNavigation";
import { MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";
import { DrawerNavigator } from "./Drawer";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveBackgroundColor: "#0088ff05",
    }}>
      <Tab.Screen name="Home" component={HomeStackNavigator} options={iconHome} />
      <Tab.Screen name="Search" component={SearchStackNavigator} options={iconSearch} />
      <Tab.Screen name="Perfil" component={ProfileStackNavigator} options={iconAdmin} />
{/*       <Tab.Screen name="Notificaciones" component={NotificationStackNavigator} options={iconMyGroups} /> */}
      {/* <Tab.Screen name="Perfil" component={DrawerNavigator} options={iconAdmin} /> */}
    </Tab.Navigator>
  );
};

const BottomTabNavigatorLogin = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      animationEnabled: false,
      tabBarLabel: "SolutionJS Software J. S.A.",
      tabBarIcon: ({ color, size }) => (
        <FontAwesome />
      ),
      tabBarStyle: {
        backgroundColor: "white",
        borderTopColor: "white",
        borderTopWidth: 1,
        position: "absolute",
        paddingBottom: 10,
      },
      tabBarActiveTintColor: "black",
      tabBarLabelStyle: {
        fontSize: 14,
      },
    }}>
      <Tab.Screen name="Login" component={LoginStackNavigator} />
    </Tab.Navigator>
  );
};

export { BottomTabNavigator, BottomTabNavigatorLogin };

const iconHome = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'home' : 'home-outline'} color={!focused ? 'black' : '#0088ff'} size={size} />),
  tabBarShowLabel: false,
};

const iconSearch = {
  tabBarLabel: 'Buscar',
  tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'search' : 'search-outline'} color={!focused ? 'black' : '#0088ff'} size={size} />),
  tabBarShowLabel: false,
};

/* const iconMyGroups = {
  tabBarLabel: 'Notificaciones',
  tabBarIcon: ({ focused, color, size }) => (<Ionicons name={focused ? 'notifications' : 'notifications-outline'} color={'black'} size={size} />),
  tabBarShowLabel: false,
}; */

const iconAdmin = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ focused, color, size }) => (<MaterialCommunityIcons name={focused ? 'account-circle' : 'account-circle-outline'} color={!focused ? 'black' : '#0088ff'} size={29} />),
  tabBarShowLabel: false,
};

/* const iconHome = {
  tabBarLabel: 'Inicio',
  tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="home" color={color} size={size} />),
};

const iconSearch = {
  tabBarLabel: 'Buscar',
  tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="card-search-outline" color={color} size={size} />),
};

const iconMyGroups = {
  tabBarLabel: 'Mis Grupos',
  tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-group" color={color} size={size} />),
};

const iconAdmin = {
  tabBarLabel: 'Perfil',
  tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="account-circle" color={color} size={size} />),
};
 */
