import { View, Text, TextInput, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { postAdmin } from "../utils/api";
import GlobalContext from "../components/global/context";
import HeaderUser from "../components/header/HeaderUser";
import Loading from "../components/loading/Loading";

export default function Administrators({ route, navigation }) {

    console.log("Pages Administrators");

    const { group } = route.params;
    const { authData } = useContext(GlobalContext);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500)
    }

    const handleOnChangeText = (value) => {
        setEmail(value);
    }
    const isValidForm = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(email) || !email.trim())
            return updateError('Email Invalido. ', setError)
        return true;
    }
    const sumbitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                const result = await postAdmin(group._id, email, authData.token);
                if (result && result.success) {
                    //navigation.navigate('Mi Perfil')
                    setEmail('');
                    setError('');
                    setLoading(false);
                    Alert.alert('Administrador Agregado con Exito!');
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
                Alert.alert('Ocurrio un error, valide bien los datos!');
            }
        }
    }

    return (
        <>
            <HeaderUser title={'add. admins'} navigation={navigation} visibleGoBack={true} />
            <Loading visible={loading}>
                <View style={styles.container}>
                    {
                        (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                    }

                    <View style={styles.campo}>
                        <Text style={styles.text}>Email</Text>
                        <TextInput style={styles.input} placeholder='ingrese email' value={email}
                            onChangeText={(value) => handleOnChangeText(value)} placeholderTextColor={'#64646499'} />
                    </View>

                    <TouchableOpacity style={styles.btn_propio} onPress={sumbitForm}>
                        <Text style={styles.text_btn_propio}>Agregar Administrador</Text>
                    </TouchableOpacity>
                </View>
            </Loading>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        fontSize: 17.5,
        justifyContent: 'center',
        color: '#0088ff',
        marginLeft: 10,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10,
    },
    btn_propio: {
        height: 45,
        backgroundColor: '#4285F4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    text_btn_propio: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },
    picker: {
        fontSize: 17.5,
        justifyContent: 'center',
        color: '#000',
        marginLeft: 2,
        marginTop: -15,
        marginBottom: -10
    },
    campo: {
        backgroundColor: '#CDCDCD40',
        borderRadius: 7,
        marginBottom: 20,
    }
})