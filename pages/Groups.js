import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import React from 'react';
import HeaderUser from "../components/header/HeaderUser";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getGroupsFollowing, getGroupsCreated } from "../utils/api";
import Loading from "../components/loading/Loading";
import { MaterialIcons } from "@expo/vector-icons";

export default function Groups({ navigation, route }) {

    console.log("Pages Groups");

    const { title, id, token, apiUrl } = route.params;
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            let result;
            if (apiUrl == 'getGroupsFollowing')
                result = await getGroupsFollowing(id, token);
            if (apiUrl == 'getGroupsCreated')
                result = await getGroupsCreated(id, token);
            if (result && result.success && result.data.length > 0) {
                setData(result.data);
                setLoading(false);
            }
        } catch (error) {
            console.log('error: ', error);
            setLoading(false);
        }
    }

    const Groups = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => navigation.navigate('Group', { group: item })}
            >
                <View style={styles.containerGroup}>
                    <View>
                        <Image style={styles.image} source={{ uri: item.image_profile }} />
                    </View>
                    <View style={{ flexDirection: 'column', alignContent: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                            <Text style={styles.name}>{item.nameAvatar}</Text>
                            {
                                item.verified == true || item.verified == 'true' ?
                                    <>
                                        <MaterialIcons name="verified" size={18} color="#1e88e5" style={{ marginLeft: 2 }} />
                                    </> :
                                    <></>
                            }
                        </View>
                        <Text style={styles.town}>{item.town}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Loading loading={loading}>
            <View style={styles.container}>
                <HeaderUser title={title} navigation={navigation} visibleGoBack={true} />
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Groups item={item} />}
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
        width: 45,
        height: 45,
        borderRadius: 25,
        marginRight: 10,
        resizeMode: 'cover',
    },
    containerGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 10,
        marginTop: 5
    },
    name: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    town: {
        color: '#636363',
        fontSize: 13,
        fontStyle: 'italic',
        textTransform: 'capitalize',
    }
});