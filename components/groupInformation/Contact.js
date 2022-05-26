import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Contact({ handleSheetChanges }) {

    console.log("components groupInformation Contact");

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => handleSheetChanges(0,1)}
        >
            <View style={{ marginLeft: 15, backgroundColor: '#4285F4', borderWidth: 1, borderRadius: 8, alignItems: 'center', justifyContent: 'center', height: 25, width: 110 }}>
                <Text style={{ fontSize: 17, color: '#fff' }}>contacto</Text>
            </View>
        </TouchableOpacity>
    );
}
