import { View, Text, StyleSheet, Image, Dimensions, ScrollView, RefreshControl, Linking, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { postAssist, deleteAssist, getEvent } from "../../utils/api";
import GlobalContext from "../global/context";
import Loading from "../loading/Loading";

const width = Dimensions.get('window').width;

export default function InfoEvent({ event, group, navigation }) {

    console.log("components InfoEvent Index");

    const timeUnix = Date.parse(new Date()) - (1000 * 60 * 3);

    const { authData } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);
    const [dataEvent, setDataEvent] = useState(event);

    const assist = async () => {
        try {
            if (group.followers.includes(authData._id)) {
                const result = await postAssist(authData._id, event._id, authData.token);
                if (result && result.success) {
                    onRefresh();
                }
            } else {
                Alert.alert('No puedes asistir a este evento, no pertence a este grupo');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const reject = async () => {
        try {
            if (group.followers.includes(authData._id)) {
                const result = await deleteAssist(authData._id, event._id, authData.token);
                if (result && result.success) {
                    onRefresh();
                }
            } else {
                Alert.alert('No puedes rechazar a este evento, no pertence a este grupo');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const onRefresh = async () => {
        try {
            const result = await getEvent(event._id, authData.token);
            if (result && result.success) {
                setDataEvent(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* const redirectToMap = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${event.coordinates.latitude},${event.coordinates.longitude}`);
    } */

    const redirectToMap = () => {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${event.lugar}`);
    }

    return (
        <Loading loading={loading}>
            <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
                <View style={styles.container}>
                    <View >
                        <View>
                            <Image source={{ uri: group.image_front_page }} style={styles.imageFronPage} />
                        </View>
                        <View style={{ marginLeft: 10, width: '100%', position: 'absolute' }}>
                            <View style={{ marginTop: 100, width: '95%', }}>
                                <View >
                                    <Image source={{ uri: group.image_profile }} style={styles.imageProfile} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginTop: 10 }}>
                            <View style={{ marginRight: 40, flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (dataEvent.participants.length > 0) {
                                            navigation.navigate('Users', { apiUrl: 'getAssist', title: 'Asistentes', id: event._id, token: authData.token })
                                        }
                                    }}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 15 }}>{dataEvent.participants.length}</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>aceptado</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (dataEvent.no_participants.length > 0) {
                                            navigation.navigate('Users', { apiUrl: 'getReject', title: 'No Asistentes', id: event._id, token: authData.token })
                                        }
                                    }}
                                >
                                    <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 30 }}>
                                        <Text style={{ fontSize: 15 }}>{dataEvent.no_participants.length}</Text>
                                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>rechazado</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{group.nameAvatar}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginRight: 20, marginTop: 10 }}>
                                {
                                    dataEvent.participants.includes(authData._id) && (dataEvent.timeUnix >= timeUnix) ?
                                        <>
                                            <View style={styles.press}>
                                                <Text style={{ marginRight: 5, fontSize: 15, color: '#000000' }}>confirmado</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => { reject(); }}>
                                                <View style={styles.rechazar}>
                                                    <Text style={{ marginRight: 5, fontSize: 15, color: '#000000' }}>rechazar</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </>
                                        :
                                        <>
                                            {
                                                dataEvent.no_participants.includes(authData._id) && (dataEvent.timeUnix >= timeUnix) ?
                                                    <>
                                                        <TouchableOpacity onPress={() => { assist() }}>
                                                            <View style={styles.asistir}>
                                                                <Text style={{ marginRight: 5, fontSize: 15, color: '#000000' }}>asistir</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                        <View style={styles.press}>
                                                            <Text style={{ marginRight: 5, fontSize: 15, color: '#000000' }}>rechazado</Text>
                                                        </View>
                                                    </>
                                                    :
                                                    <>
                                                        {
                                                            (dataEvent.timeUnix >= timeUnix) ?
                                                                <>
                                                                    <TouchableOpacity onPress={() => { assist() }}>
                                                                        <View style={styles.asistir}>
                                                                            <Text style={{ marginRight: 5, fontSize: 15, color: '#000000' }}>asistir</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => { reject() }}>
                                                                        <View style={styles.rechazar}>
                                                                            <Text style={{ marginRight: 5, fontSize: 15, color: '#000000' }}>rechazar</Text>
                                                                        </View>
                                                                    </TouchableOpacity>
                                                                </> : <></>
                                                        }

                                                    </>
                                            }
                                        </>
                                }
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 5, marginBottom: 10, marginTop: 10 }}>{dataEvent.title}</Text>
                        </View>
                        <View style={{ marginLeft: 15, marginTop: 5, marginBottom: 5, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                <EvilIcons name="calendar" size={30} color="#000000" />
                                <Text style={{ color: '#000', fontSize: 15, marginLeft: 8 }}>{dataEvent.date}</Text>
                            </View>
                            <TouchableOpacity onLongPress={() => { redirectToMap() }}>
                                <View style={{ flexDirection: 'row', width: '85%', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                    <EvilIcons name="location" size={30} color="#000000" />
                                    <Text style={{ color: '#000', fontSize: 15, marginLeft: 8 }}>{dataEvent.lugar.trim()}</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 5 }}>
                                <Ionicons name="md-watch-outline" size={27} color="#000000" />
                                <Text style={{ color: '#000', fontSize: 15, marginLeft: 8 }}>{dataEvent.time}</Text>
                            </View>

                            <View style={{ alignItems: 'center', marginBottom: 15 }}>
                                <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', fontStyle: 'italic' }}>Descripción del evento</Text>
                            </View>
                            <View>
                                <Text style={{ color: '#000', fontSize: 15 }}>{dataEvent.description.trim()}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Loading >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
    },
    imageFronPage: {
        width: width,
        height: 150,
        resizeMode: 'stretch',
        opacity: 0.4,
    },
    imageProfile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    contentContainer: {
        backgroundColor: "blue",
    },
    asistir: {
        backgroundColor: '#64dd17',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: 25,
        width: 100,
        borderWidth: 1,
        flexDirection: 'row',
        marginLeft: 10,
    },
    rechazar: {
        backgroundColor: '#ef5350',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 100,
        borderWidth: 1,
        elevation: 5,
        flexDirection: 'row',
    },
    press: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 100,
        borderWidth: 1,
    }
});

//verde asistiendo b8daba80