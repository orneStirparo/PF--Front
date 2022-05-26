import React from "react";
import { Image, StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function NewsCardScreen({ navigation, category }) {

    console.log("components search card");

    return (
        <>
            {
                category.map((item, index) => {
                    return (
                        <View key={index} style={styles.cardView}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('Category', { category: item })}>
                                <Text style={styles.title}>{item.name}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Image style={styles.image} source={{ uri: item.image }} />
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
        </>
        /* <View style={styles.cardView}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('   ', { category: category })}>
                <Text style={styles.title}>{category.name}</Text>
                <Text style={styles.author}>{category.description}</Text>
                <Image style={styles.image} source={{ uri: category.image }} />
            </TouchableOpacity>
        </View> */
    );
}

const styles = StyleSheet.create({
    cardView: {
        backgroundColor: '#fff',
        margin: width * 0.03,
        borderRadius: width * 0.05,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        borderWidth: 0.5,
        borderColor: '#d6fffb',
        elevation: 10,
        padding: width * 0.03,
        paddingTop: width * 0.01,
        paddingBottom: width * 0.01,
        paddingLeft: width * 0.01,
        paddingRight: width * 0.01,
        marginTop: width * 0.01,
        marginBottom: width * 0.01,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,

        /*         borderBottomColor: '#dbe7f4',
                borderTopColor: '#d6fffb',
                borderLeftColor: '#dbe7f4',
                borderRightColor: '#d6fffb', */
    },
    title: {
        marginHorizontal: width * 0.05,
        marginVertical: width * 0.03,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0
    },
    image: {
        height: height / 7,
        marginLeft: width * 0.05,
        marginRight: width * 0.05,
        marginVertical: height * 0.02,
        marginTop: 2
    },
    description: {
        marginBottom: width * 0.00,
        marginHorizontal: width * 0.05,
        fontSize: 15,
        color: '#808080',
        marginTop: -7
    }
});
