import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function Loading({ loading, children }) {

    console.log("components loading Loading");

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return children
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
}) 