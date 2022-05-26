import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import ProfileScreen from '../pages/Profile';
import { HomeStackNavigator, ProfileStackNavigator } from './StackNavigation';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalContext from "../components/global/context";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

    const { navigate } = useNavigation();
    const { authData, removeAuthentication } = useContext(GlobalContext);

    const img = authData.image_profile;

    return (
        <Drawer.Navigator
            screenOptions={{
                //headerShown: false,
                title: 'Proyecto Final',
            }}
            drawerContent={(props) => <MenuInterno {...props} img={img} removeAuthentication={removeAuthentication} />}
        >
            <Drawer.Screen name="Home" component={HomeStackNavigator} />
            <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
        </Drawer.Navigator>
    );
}

const MenuInterno = ({ navigation, img, removeAuthentication }) => {
    console.log({ navigation });
    return (
        <DrawerContentScrollView>
            {/* Parte del avatar */}
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: img }}
                    style={styles.avatar}
                />
            </View>

            {/* Opciones del menú */}
            <View style={styles.menuContainer}>
                {/* <TouchableOpacity
                    style={styles.menuBtn}
                    //onPress={() => navigation.navigate('StackNaviga')} 
                    onPress={() => navigation.navigate('Tab')}
                >
                    <Text style={styles.menuText}>Navegacion Tabs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuBtn}
                    onPress={() => navigation.navigate('Settings')}
                >
                    <Text style={styles.menuText}>Ajustes</Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => { navigation.navigate('New Group') }}>
                    <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
                        {<MaterialCommunityIcons name="account-multiple-plus-outline" size={25} color="#4285F4" style={{ marginRight: 15 }} />}
                        <Text style={{ fontSize: 17, color: '#000000' }}>Crear Grupo</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { removeAuthentication() }}>
                    <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
                        <MaterialCommunityIcons name="logout-variant" size={25} color="#4285F4" style={{ marginRight: 15 }} />
                        <Text style={{ fontSize: 17, color: '#000000' }}>Cerrar Sesión</Text>
                    </View>
                </TouchableOpacity>


            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 100,

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    menuContainer: {
        marginVertical: 30,
        left: 20
    },
    menuText: {
        fontSize: 18,
        color: '#000',
    },
    menuBtn: {
        padding: 10,
    }
});