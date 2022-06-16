import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

const img = 'https://lh3.googleusercontent.com/a-/AOh14Gh7fXV-ybZ874kC-v251-dl27oErOPkLfM96MTh=s96-c'

export default function CardsEvents({ navigation, data, authData, value }) {

    console.log("components home CardsEvents");
    let nuevo = [];
    data.forEach((item, index) => {
        item.events.forEach((element, i) => {
            nuevo.push({
                group: item.group,
                event: element,
            })
        })
    })



    const RenderItem = ({ items }) => {

        if (value == -1) {
            nuevo.sort((a, b) => {
                return new Date(b.event.timeUnix) - new Date(a.event.timeUnix);
            })
        }

        if (value == 1) {
            nuevo.sort((a, b) => {
                return new Date(a.event.timeUnix) - new Date(b.event.timeUnix);
            })
        }

        /*         return (
                    <>
                        {
                            items.map((item, index) => {
                                return item.events.map((event, index) => {
                                    return (
                                        <View key={index}>
                                            <View style={styles.container}>
        
                                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                                    <Image source={{ uri: item.group.image_profile }} style={styles.image} />
                                                    <View style={{ flexDirection: 'column' }}>
                                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.group.name}</Text>
                                                        <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Creo un nuevo evento</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('Evento', { event: event, group: item.group })}
                                                >
                                                    <View>
                                                        <View style={{
                                                            opacity: 0.05,
                                                            width: width,
                                                            borderWidth: 1,
                                                            borderColor: '#000',
                                                        }}>
                                                            <Image source={{ uri: item.group.image_front_page }} style={{ height: 100 }} />
                                                        </View>
                                                        <View style={{ marginLeft: 10, position: 'absolute' }}>
                                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{event.title}</Text>
                                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Cuando: {event.date}</Text>
                                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Donde: {event.namePlace.substr(0, 20).trim()}...</Text>
                                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Hora: {event.time}</Text>
                                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Descripción: {event.description.substr(0, 2).trim()}...</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
        
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginLeft: 5, marginRight: 5 }}>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('Evento', { event: event, group: item.group })}
                                                    >
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 15 }}></Text>
                                                            <EvilIcons name="check" size={30} color="green" style={{ backgroundColor: '#b8daba80', borderRadius: 50 }} />
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('Evento', { event: event, group: item.group })}
                                                    >
                                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                            <Text style={{ fontSize: 15 }}></Text>
                                                            <EvilIcons name="close-o" size={30} color="red" style={{ backgroundColor: '#ff000040', borderRadius: 50 }} />
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            })
                        }
                    </>
                )
            } */

        return (
            <>
                {
                    nuevo.map((item, index) => {
                        return (
                            <View key={index} style={styles.container}>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={{ uri: item.group.image_profile }} style={styles.image} />
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.group.nameAvatar}</Text>
                                        <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Creo un nuevo evento</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Evento', { event: item.event, group: item.group })}
                                >
                                    <View>
                                        <View style={{
                                            opacity: 0.05,
                                            width: width,
                                            borderWidth: 1,
                                            borderColor: '#000',
                                        }}>
                                            <Image source={{ uri: item.group.image_front_page }} style={{ height: 100 }} />
                                        </View>
                                        <View style={{ marginLeft: 10, position: 'absolute' }}>
                                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{item.event.title}</Text>
                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Cuando: {item.event.date}</Text>
                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Donde: {item.event.lugar.substr(0, 20).trim()}...</Text>
                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Hora: {item.event.time}</Text>
                                            <Text style={{ color: '#636363', fontSize: 13, fontStyle: 'italic' }}>Descripción: {item.event.description.substr(0, 2).trim()}...</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginLeft: 5, marginRight: 5 }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Evento', { event: item.event, group: item.group })}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15 }}></Text>
                                            <EvilIcons name="check" size={30} color="green" style={{ backgroundColor: '#b8daba80', borderRadius: 50 }} />
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Evento', { event: item.event, group: item.group })}
                                    >
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 15 }}></Text>
                                            <EvilIcons name="close-o" size={30} color="red" style={{ backgroundColor: '#ff000040', borderRadius: 50 }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })

                }
            </>
        )
    }

    return (
        <RenderItem navigation={navigation} items={data} />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: width * 0.015,
        borderRadius: width * 0.015,
        marginLeft: 5,
        marginRight: 5,
        elevation: 5,
        marginTop: 10,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 4,
        margin: 4,
        borderRadius: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 15,
        fontSize: 18,
        marginTop: 10,
        textTransform: 'capitalize',
    },
    moreIcon: {
        fontSize: 15,
        color: 'black',
        marginTop: 15,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 40,
        margin: width * 0.015,
        marginRight: 15,
        marginLeft: 10,
    }
});