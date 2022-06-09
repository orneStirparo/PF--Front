import { View, Text, ScrollView, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from "../global/context";
import { getUser, getEvents } from "../../utils/api";
import Loading from "../loading/Loading";
import Events from "./CardsEvents";
import { AntDesign } from '@expo/vector-icons';
import HeaderAdmin from "../header/HeaderAdmin";
import HeaderUser from "../header/HeaderUser";

export default function index({ navigation }) {

    console.log("components home index");

    const { authData } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(authData);
    const [data, setData] = useState();
    const [value, setValue] = useState(0);
    useEffect(() => {
        onRefresh();
        onRefreshData();
    }, [])

    const onRefresh = async () => {
        setLoading(true);
        try {
            const result = await getUser(authData._id, authData.token);
            if (result && result.success) {
                setUser(result.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const onRefreshData = async () => {
        setLoading(true);
        onRefresh();
        try {
            const result = await getEvents(authData._id, authData.token);
            if (result && result.success) {
                setData(result.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const onPress = () => {
        navigation.navigate("Notifications")
    }

    return (
        <Loading loading={loading}>
            {
                user.groups_created.length > 0 ?
                    <>
                        <HeaderAdmin navigation={navigation} title={`Bienvenido ${authData.name.substr(0, 7).trim()}...`} nameIcon={'notifications-circle-outline'} onPress={onPress} />
                    </>
                    :
                    <>
                        <HeaderUser title={`Bienvenido ${authData.name.substr(0, 7).trim()}...`} />
                    </>
            }
            <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefreshData} />}>
                {
                    (data && data.length > 0) ?
                        <>
                            {/* <View style={{ flexDirection: 'column' }}>

                                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => {
                                        setValue(1);
                                    }}>
                                        <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#5efc8260', borderRadius: 15, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <AntDesign name="arrowup" size={32} color="#00c853" />
                                            </View>
                                            <View>
                                                <Text style={{ marginLeft: 30, marginRight: 30, color: '#8d8d8d', marginTop: 5 }}>Asc.</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setValue(-1) }}>
                                        <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                            <View style={{ backgroundColor: '#ffc04660', borderRadius: 15, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
                                                <AntDesign name="arrowdown" size={32} color="#f9a825" />
                                            </View>
                                            <View>
                                                <Text style={{ marginLeft: 30, marginRight: 30, color: '#8d8d8d', marginTop: 5 }}>Des.</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                            <Text style={styles.text}>Proximos Eventos</Text>
                            <Events navigation={navigation} data={data} authData={authData} value={value} />
                        </>
                        :
                        <>
                            <Text style={styles.text}>Sin eventos por el momento</Text>
                            <TouchableOpacity
                                activeOpacity={0.1}
                                onPress={() => onRefreshData()}
                            >
                                <View style={{ alignItems: 'center', justifyContent: 'center', alignContent: 'center', borderRadius: 5, marginTop: 15 }}>
                                    <AntDesign name="reload1" size={40} color="black" />
                                    <Text>Reload</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                }

            </ScrollView>
        </Loading>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
    }
})