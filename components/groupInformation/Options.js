import { View, Text, Linking, Alert } from 'react-native';
import React, { useContext } from 'react';
import { MaterialCommunityIcons, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deleteEvent as deleteEventA } from "../../utils/api";
import GlobalContext from "../global/context";

export default function Options({ navigation, group, value, eventId, onRefresh }) {

    console.log("components groupInformation Options");

    const { authData } = useContext(GlobalContext);

    const whatsapp = () => {
        if (!group.whatsApp || group.whatsApp.length == 0) {
            Alert.alert('El grupo no posee número de whatsapp');
            return;
        } else {
            Linking.openURL('https://api.whatsapp.com/send?phone=' + group.whatsApp + '&text=Hola,%20quiero%20saber%20mas%20sobre%20el%20grupo%20' + group.nameAvatar + '.%20Te%20encontre%20en%20la%20ORT%20Belgrano.');
        }
    }

    const instagram = () => {
        if (!group.instagram || group.instagram.length == 0) {
            Alert.alert('El grupo no posee cuenta de instagram');
            return;
        } else {
            Linking.openURL('https://instagram.com/' + group.instagram);
        }
    }

    const deleteEvent = async () => {
        try {
            const result = await deleteEventA(eventId, authData.token);
            onRefresh();
        } catch (error) {
            console.log(error);
        }
    }

    if (value == 0) {
        return (
            <View>
                <View>
                    <View style={{ alignItems: 'center', marginTop: 2, marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Opciones</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CDCDCD', borderWidth: 0.3 }}></View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Nuevo Evento', { group: group })
                    }}>
                        <View style={{ marginTop: 10, marginBottom: 8, marginLeft: 15, flexDirection: 'row' }}>
                            <Entypo name="new-message" size={25} color="#4285F4" style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 17, color: '#000000' }}>Crear Evento</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate('Admin', { group: group }) }}>
                        <View style={{ marginTop: 10, marginBottom: 8, marginLeft: 15, flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="account-group" size={25} color="#4285F4" style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 17, color: '#000000' }}>Agregar Administradores</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (value == 1) {
        return (
            <View style={{ height: '100%', marginTop: 2, marginBottom: 5 }}>
                <View>
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Contacto</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CDCDCD', borderWidth: 0.3, marginTop: 10 }}></View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            whatsapp();
                        }}
                    >
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
                            <Ionicons name="ios-logo-whatsapp" size={25} color="#00bb2d" style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 17, color: '#000000' }}>WhatsApp</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            instagram();
                        }}>
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="instagram" size={25} color="#C13584" style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 17, color: '#000000' }}>Instagram</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (value == 2) {
        return (
            <View style={{ height: '100%', marginTop: 2, marginBottom: 5 }}>
                <View>
                    <View style={{ alignItems: 'center', marginBottom: 5 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>opciones</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CDCDCD', borderWidth: 0.3, marginTop: 10 }}></View>
                </View>
                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            deleteEvent();
                        }}
                    >
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
                            <AntDesign name="delete" size={24} color="#ff5722" style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 17, color: '#000000' }}>Eliminar</Text>
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        onPress={() => {
                            instagram();
                        }}>
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 15, flexDirection: 'row' }}>
                            <MaterialCommunityIcons name="instagram" size={25} color="#C13584" style={{ marginRight: 15 }} />
                            <Text style={{ fontSize: 17, color: '#000000' }}>Instagram</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
            </View>
        );
    }

}
