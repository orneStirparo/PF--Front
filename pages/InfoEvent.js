import { View, StyleSheet } from 'react-native';
import React from 'react';
import Index from "../components/infoEvent/Index";
import HeaderUser from "../components/header/HeaderUser";

export default function InfoEvent({ route, navigation }) {

    console.log("Pages InfoEvent");

    const { event, group } = route.params;

    return (
        <View style={styles.container}>
            <HeaderUser navigation={navigation} title={'Información del evento'} visibleGoBack={true} />
            <Index event={event} group={group} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});