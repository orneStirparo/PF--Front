import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

export default function Index(props) {

    return (
        <View style={[{ marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 5 }, props.styles]}>
            <Text style={{ fontWeight: 'bold' }}>{props.label}</Text>
            <TextInput {...props} />
            <View style={{ borderBottomColor: '#737373', borderBottomWidth: StyleSheet.hairlineWidth }} />
        </View>
    )
}