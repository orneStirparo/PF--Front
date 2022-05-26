import React from 'react'
import { StyleSheet, View } from 'react-native'
import Notifications from "../components/notifications/Notifications";

export default function NotificationScreen({ navigation }) {

    console.log('Pages Notification');

    return (
        <View style={styles.container}>
            <Notifications navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: 'column',
    }
});
