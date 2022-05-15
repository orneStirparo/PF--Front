import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

export default function Index(props) {
    return (
        <TouchableOpacity {...props} >
            <View style={styles.btn}>
                <Text style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#4285F4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        marginTop: 20,
        marginBottom: 0,
        width: '50%',
        alignSelf: 'center',
        marginBottom: 15
    }
})