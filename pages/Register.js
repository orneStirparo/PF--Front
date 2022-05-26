import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { register, validationCode } from "../utils/api";
import Loading from "../components/loading/Loading";
import InpuText from "../components/TextInput/Index";
import { Ionicons } from "@expo/vector-icons";
import BtnNext from "../components/Buttom/Index";

export default function Register({ navigation }) {

    console.log("Pages Register", navigation);

    const [newRegister, setNewRegister] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        code: '',
    });
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [verificationCode, setVerificationCode] = useState(false);
    const [sendCode, setSendCode] = useState(false);

    const { name, email, password, repeatPassword, code } = newRegister;

    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500)
    }

    const handleOnChangeText = (value, fieldName) => {
        setNewRegister({
            ...newRegister,
            [fieldName]: value
        })
    }

    const reg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const isValidForm = () => {
        if (!name.trim() || name.length < 3)
            return updateError('Nombre Invalido, debe contener al menos 3 letras', setError)
        if (!email.trim() || reg.test(email) === false)
            return updateError('Email invalido, compruebe que no hayan espacios en blanco al final', setError)
        if (!password.trim() || password.length < 8)
            return updateError('La password debe contener 8 o mas caracteres', setError)
        if (!repeatPassword.trim() || repeatPassword !== password)
            return updateError('Las password no coinciden', setError)
        return true;
    }

    const sumbitForm = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                const response = await register(name, email, password, repeatPassword);
                if (response && response.success) {
                    setLoading(false);
                    setSendCode(true);
                } else {
                    setLoading(false);
                    return updateError('No se puede procesar la solicitud', setError)
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }
    }

    const validationCodeEmail = async () => {
        try {
            setLoading(true);
            const response = await validationCode(email, code);
            if (response && response.success) {
                setLoading(false);
                setVerificationCode(true);
            } else {
                setLoading(false);
                return updateError('Codigo Incorrecto', setError)
            }
        } catch (error) {
            setLoading(false);
            console.log('error', error);
        }
    }

    const SubTitle = (props) => {
        return (
            <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 30 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: '#0088ff' }}>{props.title}</Text>
            </View>
        )
    }

    const BtnBack = (props) => {
        return (
            <View style={{ marginTop: 20, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', marginBottom: 30 }}>
                <Ionicons name="arrow-back" size={24} color="#0088ff" />
                <TouchableOpacity {...props}>
                    <Text style={{ color: '#0088ff', fontWeight: 'bold', marginLeft: 5 }}>{props.title}</Text>
                    <View style={{
                        borderBottomColor: '#0088ff', borderBottomWidth: StyleSheet.hairlineWidth
                    }} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Loading loading={loading}>
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: '#0088ff15', marginTop: 35, borderRadius: 10, marginLeft: 15, marginRight: 15 }}>

                    {
                        !sendCode ?
                            <>
                                <SubTitle title="Crear Cuenta" />

                                {
                                    (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                                }

                                <InpuText label={'Nombre'} placeholder="Ingresar Nombre y Apellido" value={name} autoCapitalize="words"
                                    onChangeText={(value) => handleOnChangeText(value, 'name')} />

                                <InpuText label={'Email'} placeholder="Ingresar Email" autoCapitalize='none' value={email}
                                    onChangeText={(value) => handleOnChangeText(value, 'email')} />

                                <InpuText label={'Password'} placeholder="Ingresar Password" secureTextEntry autoCapitalize='none' value={password}
                                    onChangeText={(value) => handleOnChangeText(value, 'password')} />

                                <InpuText label={'Repetir Password'} placeholder="Repetir Password" secureTextEntry autoCapitalize='none' value={repeatPassword}
                                    onChangeText={(value) => handleOnChangeText(value, 'repeatPassword')} />

                                <BtnNext activeOpacity={0.8} title="Registrarse" onPress={() => sumbitForm()} />
                            </>
                            :
                            <>
                                {
                                    !verificationCode ?
                                        <>
                                            <SubTitle title="Codigo de verificacion" />

                                            {
                                                (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                                            }
                                            <Text style={{ alignSelf: 'center' }}>Ingresa el codigo</Text>
                                            <Text style={{ alignSelf: 'center' }}>enviado a tu correo</Text>
                                            <Text style={{ alignSelf: 'center' }}>revisa en bandeja de entrada o en spam</Text>

                                            <InpuText autoCapitalize='none' value={code} keyboardType='numeric' styles={{ borderWidth: 1, borderRadius: 7 }}
                                                onChangeText={(value) => handleOnChangeText(value, 'code')} textAlign={'center'} style={{ fontSize: 30 }} />

                                            <BtnNext activeOpacity={0.8} title="Validar" onPress={() => validationCodeEmail()} />
                                        </>
                                        :
                                        <>
                                            <SubTitle title="Cuenta Creada con exito!" />
                                            <BtnBack title="Atras" onPress={() => navigation.goBack()} />
                                        </>
                                }
                            </>
                    }
                </View>
            </ScrollView>
        </Loading>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    register: {
        backgroundColor: '#4285F4',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginTop: 20,
        marginBottom: 0,
        width: '50%',
        alignSelf: 'center',
        marginBottom: 15
    }
})