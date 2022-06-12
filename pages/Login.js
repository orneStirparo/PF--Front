import React, { useContext, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GlobalContext from "../components/global/context";
import { loginGoogle, login } from "../utils/api";
import Loading from "../components/loading/Loading";
import InpuText from "../components/TextInput/Index";
import BtnNext from "../components/Buttom/Index";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {

    console.log('Pages Login');

    const [loginEmail, setLogin] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const { authData, applyAuthentication } = useContext(GlobalContext);
    const [accessToken, setAccessToken] = useState();
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "350934348883-msanvqda87og3fs6hkhbi45gouiln9nh.apps.googleusercontent.com",
        iosClientId: "350934348883-5uooanu5p5he0fdh6d69egovcv72glch.apps.googleusercontent.com",
        expoClientId: "350934348883-r4fa3j6jdvhrffqu2lc8dp0fdng84dvs.apps.googleusercontent.com",
    });

    const { email, password } = loginEmail;

    useEffect(() => {
        console.log('SUCCESS', response);
        if (response?.type === "success") {
            console.log('SI O QUE??');
            setAccessToken(response.authentication.accessToken);
        }
    }, [response]);

    useEffect(async () => {
        if (accessToken) {
            console.log('ACCESS TOKEN', accessToken);
            try {
                setLoading(true);
                console.log('llamando a la API de google para obtener el usuario');
                const res = await loginGoogle(accessToken);
                console.log(res);
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

    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500)
    }

    const handleOnChangeText = (value, fieldName) => {
        setLogin({
            ...loginEmail,
            [fieldName]: value
        })
    }

    const isValidObjeField = (obj) => {
        return Object.values(obj).every(value => value.trim())
    }
    const reg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const isValidForm = () => {
        if (!isValidObjeField(loginEmail))
            return updateError('Requerido todos los datos', setError)
        if (!email.trim() || reg.test(email) === false)
            return updateError('Email invalido, compruebe que no hayan espacios en blanco al final ', setError)
        if (!password.trim() || password.length < 8)
            return updateError('La password debe contener 8 o mas caracteres', setError)
        return true;
    }

    const sumbitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                const response = await login(email, password);
                if (response && response.success) {
                    console.log(response);
                    setUserInfo(response);
                    setLogin({
                        email: '',
                        password: ''
                    });
                } else {
                    setLoading(false);
                    return updateError('Datos Incorrectos', setError)
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }
        return updateError('Datos incompleto', setError)
    }

    return (
        <Loading loading={loading}>
            <ScrollView style={styles.container}>
                <Image source={require('../assets/iconEyeFit.png')} style={styles.logo} />
                <View style={{ marginLeft: 15, marginRight: 15, marginTop: 15, backgroundColor: '#0088ff15', borderRadius: 10 }}>
                    <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
                        <Text style={styles.text}>Bienvenido</Text>
                    </View>

                    {
                        (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                    }

                    <InpuText label={'Email'} placeholder="Ingresar Email" autoCapitalize='none' value={email}
                        onChangeText={(value) => handleOnChangeText(value, 'email')} />

                    <InpuText label={'Password'} placeholder="Ingresar Password" secureTextEntry autoCapitalize='none' value={password}
                        onChangeText={(value) => handleOnChangeText(value, 'password')} />

                    <BtnNext activeOpacity={0.8} title="Iniciar Sesión" onPress={() => sumbitForm()} />

                </View>
                <View style={{ flexDirection: 'row', marginTop: 15, alignSelf: 'center' }}>
                    <Text style={{ marginRight: 10, fontWeight: 'bold', }}>Olvidaste la password?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
                        <Text style={{ fontWeight: 'bold', color: '#4285F4' }}>Cambiar Password</Text>
                        <View style={{
                            borderBottomColor: '#737373',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 15, alignSelf: 'center' }}>
                    <Text style={{ marginRight: 10, fontWeight: 'bold', }}>No tienes cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ fontWeight: 'bold', color: '#4285F4' }}>Registrate aqui</Text>
                        <View style={{
                            borderBottomColor: '#737373',
                            borderBottomWidth: StyleSheet.hairlineWidth
                        }} />
                    </TouchableOpacity>
                </View>

                <View style={{ marginTop: 20, alignSelf: 'center', flexDirection: 'column' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0088ff', alignSelf: 'center', marginBottom: 10 }}>or</Text>
                    <TouchableOpacity
                        onPress={() => { promptAsync({ showInRecents: true }) }}
                    /* onPress={signInWithGoogleAsync} */
                    >
                        <Image source={require('../assets/btn_google_signin.png')} style={styles.google} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Loading>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff',
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