import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SearchStackScreen from "../pages/Search";
import GroupsByCategory from "../pages/CategoryGroups";
import HomeStackScreen from "../pages/Home";
import ProfileStackScreen from "../pages/Profile";
import LoginStackScreen from "../pages/Login";
import GroupInformationStackScreen from "../pages/GroupInformation";
import CreateGroup from "../pages/CreateGroup";
import NotificationStackScreen from "../pages/Notifications";
import NewEventStack from "../pages/NewEvents";
import InfoEventStack from "../pages/InfoEvent";
import UsersStack from "../pages/Users";
import FollowingGroups from "../pages/Groups";
import AdministratorsStack from "../pages/Administrators";
import Register from "../pages/Register";
import ChangePassword from "../pages/ChangePassword";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#fff",
    },
    headerTintColor: "#000",
};

const LoginStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="H A N U K A" component={LoginStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Inicio" component={HomeStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={NotificationStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Evento" component={InfoEventStack} options={{ headerShown: false }} />
            <Stack.Screen name="Users" component={UsersStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

/* const NotificationStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Notifications" component={NotificationStackScreen} />
        </Stack.Navigator>
    );
}; */

const SearchStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Buscar" component={SearchStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Category" component={GroupsByCategory} options={{ headerShown: false }} />
            <Stack.Screen name="Group Information" component={GroupInformationStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Nuevo Evento" component={NewEventStack} options={{ headerShown: false }} />
            {/* <Stack.Screen name="Followers" component={UsersStack} options={{ headerShown: false }} /> */}
            <Stack.Screen name="Event" component={InfoEventStack} options={{ headerShown: false }} />
            <Stack.Screen name="Users" component={UsersStack} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={AdministratorsStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

/* const MyGroupsStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Mis Grupos" component={MyGroupsStackScreen} />
            <Stack.Screen name=" " component={GroupInformationStackScreen} />
        </Stack.Navigator>
    );
}; */

const ProfileStackNavigator = ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Mi Perfil" component={ProfileStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="New Group" component={CreateGroup} options={{ headerShown: false }} />
            <Stack.Screen name="Groups" component={FollowingGroups} options={{ headerShown: false }} />
            <Stack.Screen name="Group" component={GroupInformationStackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Event" component={InfoEventStack} options={{ headerShown: false }} />
            <Stack.Screen name="Nuevo Evento" component={NewEventStack} options={{ headerShown: false }} />
            <Stack.Screen name="Users" component={UsersStack} options={{ headerShown: false }} />
            <Stack.Screen name="Admin" component={AdministratorsStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export { LoginStackNavigator, HomeStackNavigator, SearchStackNavigator, ProfileStackNavigator };
