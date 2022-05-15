import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export default function CardsGroupScreen({ groups, navigation, onload }) {

    console.log("components groupsByCategory Card");

    const RenderItem = ({ items }) => {
        return (
            <>
                {
                    items.map((item, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity
                                    activeOpacity={0.5}
                                    onPress={() =>
                                        navigation.navigate('Group Information', { group: item })
                                    }>
                                    <View style={styles.container}>
                                        <View style={styles.card}>
                                            <View style={styles.cardHeader}>
                                                <View style={styles.headerLeft}>
                                                    <Image
                                                        style={styles.userImage}
                                                        source={{ uri: item.image_profile }}
                                                    />
                                                    <View style={{ flexDirection: 'column', alignContent: 'center' }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                                            <Text style={styles.userName}>{item.nameAvatar}</Text>
                                                            {
                                                                item.verified == true || item.verified == 'true' ?
                                                                    <>
                                                                        <MaterialIcons name="verified" size={18} color="#1e88e5" style={{ marginTop: 8, marginLeft: 4 }} />
                                                                    </> :
                                                                    <></>
                                                            }
                                                        </View>
                                                        <Text style={styles.city}>{item.city}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.headerRight}></View>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </>
        )
    }

    return (
        <RenderItem navigation={navigation} items={groups} />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        margin: width * 0.015,
        borderRadius: width * 0.015,
        //shadowColor: '#000',
        //shadowOffset: { width: 0.5, height: 0.5 },
        //shadowOpacity: 0.8,
        //shadowRadius: 3,
        marginLeft: 10,
        marginRight: 10,
        //elevation: 1,
        borderLeftColor: '#1e88e599',
        //borderLeftWidth: 0.5,
        //borderRightWidth: 0.5,
        //borderBottomWidth: 0.5,
        //borderTopWidth: 0.5,
    },
    card: {
        backgroundColor: '#fff',
        //padding: 4,
        margin: 4,
        borderRadius: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 25,
    },
    userName: {
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 16,
        marginTop: 5,
        //textTransform: 'capitalize',
    },
    moreIcon: {
        fontSize: 20,
        color: 'gray',
        marginTop: 15,
    },
    separator: {
        height: 1,
        width: '100%',
        backgroundColor: '#CED0CE',
    },
    city: {
        color: '#636363',
        fontSize: 13,
        fontStyle: 'italic',
        textTransform: 'capitalize',
        marginLeft: 5,
    }
});