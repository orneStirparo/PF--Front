import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { acceptUser as acceptUserA, rejectUser as rejectUserA } from "../../utils/api";
import GlobalContext from "../global/context";

export default function Card(props) {

    console.log("components notifications Card");

    let { item } = props;
    const { authData } = useContext(GlobalContext);
    const [text, setText] = useState('');

    async function acceptUser() {
        try {
            const result = await acceptUserA(item.id_user, item.id_group, authData.token);
            if (result && result.success) {
                if (authData._id === item.id_user) {
                    const pos = authData.groups_requested.indexOf(item.id_group);
                    const groups_requested = authData.groups_requested.splice(pos, 1);
                    const user = {
                        ...authData,
                        groups_following: [...authData.groups_following, item.id_group],
                        groups_requested: groups_requested
                    }
                    authData.iniciar(user);
                }
                props.setOnAccept(prev => !prev);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }
    async function rejectUser() {
        try {
            const result = await rejectUserA(item.id_user, item.id_group, authData.token);
            if (result && result.success) {
                if (authData._id === item.id_user) {
                    const pos = authData.groups_requested.indexOf(item.id_group);
                    const groups_requested = authData.groups_requested.splice(pos, 1);
                    const user = {
                        ...authData,
                        groups_requested: groups_requested
                    }
                    authData.iniciar(user);
                }
                props.setOnAccept(prev => !prev);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: props.image }} style={styles.image} />
                <Text style={styles.text}>{props.name_user}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View>
                    <Text style={{ color: 'white', }}>Quiere unirse a</Text>
                </View>
                <View>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{props.name_group}</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        acceptUser()
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', marginBottom: 1, borderRadius: 5 }}>
                        <Text style={{ marginLeft: 10 }}>aceptar</Text>
                        <MaterialCommunityIcons name="check" size={30} color="rgb(0, 157, 113)" style={{ marginRight: 10 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                        rejectUser()
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#D3D3D3', borderRadius: 5 }}>
                        <Text style={{ marginLeft: 10 }}>rechazar</Text>
                        <MaterialCommunityIcons name="close" size={30} color="red" style={{ marginRight: 10 }} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        top: 2,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 4,
        borderBottomColor: '#eaeaea',
        borderRadius: 10,
        backgroundColor: 'gray',
        marginEnd: 10,
        marginStart: 10,
    },
    image: {
        flex: 1,
        width: 45,
        borderRadius: 50,
        marginRight: 10
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
    }
})