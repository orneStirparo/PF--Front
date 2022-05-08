import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginStackScreen from "../pages/Login";

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
            <Stack.Screen name="Proyecto Final" component={LoginStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export { LoginStackNavigator };
