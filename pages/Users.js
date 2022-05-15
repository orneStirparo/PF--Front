import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import HeaderUser from "../components/header/HeaderUser";
import { getFollowers, getAssistants, getRejects } from "../utils/api";
import Loading from "../components/loading/Loading";
import { MaterialIcons } from '@expo/vector-icons';

export default function UsersScreen({ route, navigation }) {

    console.log('pages Users');

    const { title, id, token, apiUrl } = route.params;

    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            let result;
            if (apiUrl == 'getAssistants')
                result = await getFollowers(id, token);
            if (apiUrl == 'getAssist')
                result = await getAssistants(id, token);
            if (apiUrl == 'getReject')
                result = await getRejects(id, token);
            if (apiUrl == 'getFollowers')
                result = await getFollowers(id, token);
            if (result && result.success && result.data.length > 0) {
                setData(result.data);
                setLoading(false);
            }
        } catch (error) {
            console.log('error: ', error);
            setLoading(false);
        }
    }



    const User = ({ item }) => {
        return (
            <View style={styles.containerAssistants}>
                <Image style={styles.image} source={{ uri: item.image_profile }} />
                <Text style={styles.text}>{item.name}</Text>
                {
                    item.verified == true || item.verified == 'true' ?
                        <>
                            <MaterialIcons name="verified" size={18} color="#1e88e5" style={{ marginLeft: 4 }} />
                        </> :
                        <></>
                }
            </View>
        );
    }

    return (
        <Loading loading={loading}>
            <View style={styles.container}>
                <HeaderUser navigation={navigation} title={title} visibleGoBack={true} />
                <FlatList
                    data={data}
                    renderItem={({ item }) => <User item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </Loading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 25,
        marginRight: 10,
    },
    containerAssistants: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 15,
        marginTop: 10
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 4,
    }
});