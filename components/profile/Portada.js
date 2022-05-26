import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import GlobalContext from "../global/context";
import ChangeImage from "../../utils/metodos";
import * as ImagePicker from "expo-image-picker";

export default function Portada({ user, onRefresh, navigation, setLoading }) {

    console.log("components profile Portada");

    const { authData } = useContext(GlobalContext);

    async function Permission() {
        try {
            let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (result.granted === false) {
                return false;
            }
            else
                return true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function onloadProfileUser(item) {
        try {
            if (await Permission()) {
                const result = await ChangeImage.changeImageProfileUser(authData._id, authData.token, item);
                if (result && result.success) {
                    Alert.alert('La imagen se cambio con exito, refresca para visualizarla');
                }
            } else
                Alert.alert('No se puede cambiar la imagen, se necesita permisos');
        } catch (error) {
            Alert.alert('No se puede subir la imagen');
        }
    }

    return (
        <View>

            <View>
                <TouchableOpacity
                    activeOpacity={1}
                    onLongPress={() => { onloadProfileUser('image_profile') }}
                >
                    <Image style={styles.image} source={{ uri: user.image_profile }} />
                </TouchableOpacity>
            </View>

            <View style={{ position: 'absolute' }}>
                {
                    (user.groups_created.length > 0) ?
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', alignContent: 'flex-end', width: '100%', marginTop: 35 }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Groups', { title: 'siguiendo', id: authData._id, token: authData.token, apiUrl: 'getGroupsFollowing' });
                                }}>
                                    <View style={{ alignContent: 'center', alignItems: 'center', marginRight: 20 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.groups_following.length}</Text>
                                        <Text>Siguiendo</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Groups', { title: 'mis grupos', id: authData._id, token: authData.token, apiUrl: 'getGroupsCreated' });
                                }}>
                                    <View style={{ alignContent: 'center', alignItems: 'center', marginRight: 40 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.groups_created.length}</Text>
                                        <Text>Mis Grupos</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                        :
                        <>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 35, marginLeft: 20 }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Groups', { title: 'siguiendo', id: authData._id, token: authData.token, apiUrl: 'getGroupsFollowing' });
                                }}>
                                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>{user.groups_following.length}</Text>
                                        <Text>Siguiendo</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </>
                }
            </View>

            <View style={{ marginTop: 10 }}>
                <Text style={styles.textName}>{user.name}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: "#4285F4",
        marginLeft: 20,
        borderWidth: 3,
        marginTop: 10,
        resizeMode: 'cover',
    },
    textName: {
        fontSize: 17,
        fontWeight: "bold",
        marginLeft: 15,
    },
});