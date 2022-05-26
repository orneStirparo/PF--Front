import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { getAllEventsUser } from "../../utils/api";
import { EvilIcons } from '@expo/vector-icons';

export default function Body({ idUser, navigation, token }) {

    console.log("components profile Body");

    const [data, setData] = React.useState();

    React.useEffect(() => {
        events();
    }, [])

    const events = async () => {
        try {
            const result = await getAllEventsUser(idUser, token);
            if (result && result.data.length > 0) {
                setData(result.data);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const Render = () => {
        let nuevo = [];
        data.forEach((item, index) => {
            item.events.forEach((element, i) => {
                nuevo.push({
                    group: item.group,
                    event: element,
                })
            })
        })

        nuevo.sort((a, b) => {
            return new Date(b.event.timeUnix) - new Date(a.event.timeUnix);
        })

        return (
            nuevo.map((item, i) => {
                return (
                    <View key={i} style={{ marginTop: 5, marginBottom: 5, backgroundColor: '#F0FFFF30', marginLeft: 10, marginRight: 10, borderRadius: 2, borderWidth: 0.25 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Event', { event: item.event, group: item.group })}>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginBottom: 3, marginRight: 10, marginLeft: 15 }}>
                                    <Text style={{ fontSize: 18 }}>{item.event.title.substr(0, 30)}</Text>
                                    <Text style={{ color: 'gray' }}>{item.event.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 3, marginTop: 3 }}>
                                    <EvilIcons name="location" size={24} color="gray" />
                                    <Text style={{ fontStyle: 'italic' }}>{item.event.lugar.substr(0, 48)}</Text>
                                </View>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ color: 'gray' }}>{item.group.nameAvatar}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            })
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Eventos</Text>
            </View>
            {
                data && data.length > 0 ?
                    <>
                        <Render />
                    </>
                    :
                    <>
                        <View style={{ width: '100%', height: Dimensions.get('window').height - 450, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                            <Text>No hay eventos</Text>
                        </View>
                    </>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 10,
        height: '100%'
    }
});