import { View, StyleSheet } from 'react-native';
import React from 'react';
import Index from "../components/event/index";
import Header from "../components/header/HeaderUser";

export default function NewEvents({ navigation, route }) {

    console.log('Pages NewEvents.js');
    const { group } = route.params;

    return (
        <View style={styles.container}>
            <Header title="Nuevo Evento" navigation={navigation} visibleGoBack={true} />
            <Index navigation={navigation} group={group} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
        flexDirection: 'column',
    }
});