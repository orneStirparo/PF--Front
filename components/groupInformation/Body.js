import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { EvilIcons } from '@expo/vector-icons';

export default function Body({ group, navigation, authData, events, handleSheetChanges }) {

    console.log("components groupInformation Body");

    const Render = () => {
        events.sort((a, b) => {
            return new Date(b.timeUnix) - new Date(a.timeUnix);
        })
        return (
            events.map((item, index) => {
                return (
                    <View key={index} style={{ marginTop: 5, marginBottom: 5, backgroundColor: '#F0FFFF30', marginLeft: 10, marginRight: 10, borderRadius: 2, borderWidth: 0.25 }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Event', { event: item, group: group })}
                            onLongPress={() => {
                                if (authData.email == group.email_owner) {
                                    handleSheetChanges(0, 2, item._id);
                                }
                            }}
                        >
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3, marginBottom: 3, marginRight: 10, marginLeft: 15 }}>
                                    <Text style={{ fontSize: 18 }}>{item.title.substr(0, 30)}</Text>
                                    <Text style={{ color: 'gray' }}>{item.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 3, marginTop: 3 }}>
                                    <EvilIcons name="location" size={24} color="gray" />
                                    <Text style={{ fontStyle: 'italic' }}>{item.lugar.substr(0, 30)}...</Text>
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
                events && events.length > 0 ?
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