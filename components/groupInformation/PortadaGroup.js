import React, {  useContext } from 'react'
import { Alert, Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'
import GlobalContext from "../global/context";
import ChangeImage from "../../utils/metodos";
import api from "../../utils/api";
import Follow from "./Follow";
import Contact from "./Contact";
/* import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; */
import Options from "./Options";
import Body from './Body';
import * as ImagePicker from "expo-image-picker";

export default function PortadaGroup({ group, navigation, onRefresh, handleSheetChanges }) {

    console.log("components groupInformation PortadaGroup");

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

    async function onloadImage(item) {
        try {
            if (await Permission()) {
                const result = await ChangeImage.changeImageGroup(group._id, authData.token, item);
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
        <View style={{ width: Dimensions.get('window').width, flex: 1, height: 260 }}>
            {
                group.email_owner == authData.email ?
                    <>
                        <TouchableOpacity onLongPress={() => { onloadImage('image_front_page') }} activeOpacity={0.7}>
                            <View>
                                <Image style={{ height: 130, opacity: 0.4 }} source={{ uri: group.image_front_page }} />
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        <View>
                            <Image style={{ height: 130, opacity: 0.4 }} source={{ uri: group.image_front_page }} />
                        </View>
                    </>
            }

            <View style={{ position: 'absolute', top: 90, marginLeft: 10, width: '100%', }}>

                {
                    group.email_owner == authData.email ?
                        <>
                            <TouchableOpacity onLongPress={() => { onloadImage('image_profile') }} activeOpacity={0.7}>
                                <View>
                                    <Image style={{ width: 90, height: 90, borderRadius: 50, borderColor: '#4285F4', borderWidth: 2 }} source={{ uri: group.image_profile }} />
                                </View>
                            </TouchableOpacity>
                        </>
                        :
                        <>
                            <View>
                                <Image style={{ width: 90, height: 90, borderRadius: 50, borderColor: '#4285F4', borderWidth: 2 }} source={{ uri: group.image_profile }} />
                            </View>
                        </>
                }


                <View style={{ position: 'absolute', marginTop: 60, flexDirection: 'column', width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => { navigation.navigate('Users', { apiUrl: 'getFollowers', title: 'Seguidores', id: group._id, token: authData.token }) }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontWeight: 'bold' }}>{group.followers.length}</Text>
                        </View>
                        <View>
                            <Text>seguidores</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10 }}>{group.nameAvatar}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center', alignContent: 'center', justifyContent: 'space-evenly', marginRight: 10 }}>
                    <Follow group={group} onRefresh={onRefresh} />
                    <Contact group={group} onRefresh={onRefresh} handleSheetChanges={handleSheetChanges} />
                </View>
                <View style={{ borderWidth: 0.3, marginTop: 15, borderColor: '#c3c3c3' }}></View>
            </View>
        </View >
    )
}