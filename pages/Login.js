import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import GlobalContext from "../components/global/context";
import { loginGoogle } from "../utils/api";
import Loading from "../components/loading/Loading";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {


    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const { authData, applyAuthentication } = useContext(GlobalContext);
    const [accessToken, setAccessToken] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "350934348883-r4fa3j6jdvhrffqu2lc8dp0fdng84dvs.apps.googleusercontent.com",
        iosClientId: "350934348883-5uooanu5p5he0fdh6d69egovcv72glch.apps.googleusercontent.com",
        expoClientId: "350934348883-r4fa3j6jdvhrffqu2lc8dp0fdng84dvs.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response]);

    useEffect(async () => {
        if (accessToken) {
            try {
                setLoading(true);
                console.log('llamando a la API de google para obtener el usuario');
                const res = await loginGoogle(accessToken);
                if (res && res.success) {
                    setUserInfo(res);
                    setLoading(false);
                }
            } catch (e) {
                Alert.alert('Si el problema persiste, contacta con al administrador');
                console.log(e);
                setLoading(false);
            }
        }
    }, [accessToken]);

    useEffect(() => {
        if (userInfo) {
            console.log('useffect userInfo');
            const user = {
                _id: userInfo.data._id,
                email: userInfo.data.email,
                name: userInfo.data.name,
                image_profile: userInfo.data.image_profile,

                groups_following: userInfo.data.groups_following,
                groups_requested: userInfo.data.groups_requested,
                groups_created: userInfo.data.groups_created,
                token: userInfo.accessToken
            };
            applyAuthentication(user);
            authData.iniciar(user);
        }
        return () => {
            setUserInfo(null);
        };
    }, [userInfo]);

    return (
        <Loading loading={loading}>
            <View style={styles.container}>
                <Image source={require('../assets/iconHanuka.png')} style={styles.logo} />
                <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15, backgroundColor: '#0088ff15', borderRadius: 10 }}>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
                        <Text style={styles.text}>Proyecto Final</Text>
                    </View>

                </View>

                <View style={{ marginTop: 20, alignSelf: 'center', flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => { promptAsync({ showInRecents: true }) }}>
                        <Image source={require('../assets/btn_google_signin.png')} style={styles.google} />
                    </TouchableOpacity>
                </View>
            </View>
        </Loading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 100,
        marginTop: 35,
    },
    text: {
        fontSize: 20,
        color: '#0088ff',
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    singin: {
        backgroundColor: '#4285F4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginTop: 20,
        marginBottom: 20,
        width: '50%',
        alignSelf: 'center'
    },
    google: {
        width: Dimensions.get('window').width - 100,
        height: 40,
    },
});