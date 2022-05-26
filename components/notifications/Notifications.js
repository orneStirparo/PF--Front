import React, { useContext, useEffect, useState } from 'react'
import { FlatList,  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import GlobalContext from "../global/context";
import {getRequets} from "../../utils/api";
import Card from './Card';
import {  AntDesign } from '@expo/vector-icons';
import Loading from '../loading/Loading';
import HeaderUser from '../header/HeaderUser';

export default function Notifications({ navigation }) {

    console.log("components notifications Notifications");

    const [notifications, setNotifications] = useState([]);
    const { authData } = useContext(GlobalContext);
    const [refreshing, setRefreshing] = useState(true);
    const [onAccept, setOnAccept] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onload();
    }, []);

    useEffect(() => {
        onload();
    }, [onAccept]);

    async function onload() {
        //setLoading(true);
        try {
            const result = await getRequets(authData._id, authData.token);
            if (result && result.success && result.data.length > 0) {
                setNotifications(res => res = result.data);
                //setRefreshing(false);
                setLoading(false);
            }
            else {
                setNotifications([]);
                //setRefreshing(false);
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    return (
        <Loading loading={loading}>

            <View>
                <HeaderUser title="Notificaciones" visibleGoBack={true} navigation={navigation} />
                {
                    notifications.length > 0 ?
                        <>
                            <FlatList
                                data={notifications}
                                renderItem={({ item }) => <Card name_user={item.name_user} image={item.image_user} name_group={item.nameAvatar}
                                    item={item} setOnAccept={setOnAccept} />}
                                keyExtractor={item => item.id}
                                //horizontal={true}
                                refreshing={false}
                                onRefresh={() => onload()}
                            />
                        </>
                        :
                        <>
                            <Text style={styles.text}>No tienes nuevas notificaciones</Text>
                            <TouchableOpacity
                                activeOpacity={0.1}
                                onPress={() => onload()}
                            >
                                <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', borderRadius: 5, marginTop: 15 }}>
                                    <AntDesign name="reload1" size={40} color="black" />
                                    <Text>Reload</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                }
            </View>
        </Loading>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 20,
    }
})