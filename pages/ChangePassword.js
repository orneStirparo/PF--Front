import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { generateCode, validationCode as validationC, changePassword as change } from "../utils/api";
import InpuText from "../components/TextInput/Index";
import Loading from "../components/loading/Loading";
import { Ionicons } from "@expo/vector-icons";
import BtnNext from "../components/Buttom/Index";

export default function ChangePassword({ navigation }) {

    console.log("Pages ChangePassword");

    const [loading, setLoading] = useState(false);
    const [change, setChange] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        code: '',
    });
    const [verificationCode, setVerificationCode] = useState(false);
    const [sendCode, setSendCode] = useState(false);
    const { email, password, repeatPassword, code } = change;
    const [error, setError] = useState();
    const [passwordChange, setPasswordChange] = useState(false);

    const handleOnChangeText = (value, fieldName) => {
        setChange({
            ...change,
            [fieldName]: value
        })
    }

    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500)
    }

    const reg = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    const isValidForm = () => {
        if (!password.trim() || password.length < 8)
            return updateError('La password debe contener 8 o mas caracteres', setError)
        if (!repeatPassword.trim() || repeatPassword !== password)
            return updateError('Las password no coinciden', setError)
        return true;
    }

    const sumbitForm = async () => {
        if (!email.trim() || reg.test(email) === false) {
            return updateError('Email invalido, compruebe que no hayan espacios en blanco al final', setError)
        } else {
            try {
                setLoading(true);
                const response = await generateCode(email);
                if (response && response.success) {
                    setLoading(false);
                    setSendCode(true);
                } else {
                    setLoading(false);
                    return updateError('No se puede procesar la solicitud', setError)
                }
                setLoading(false);
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }
    }

    const validationCode = async () => {
        try {
            setLoading(true);
            const response = await validationC(email, code);
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

    const passwordChangeFunct = async () => {
        if (isValidForm()) {
            try {
                setLoading(true);
                const response = await change(email, password, repeatPassword, code);
                if (response && response.success) {
                    setLoading(false);
                    setPasswordChange(true);
                } else {
                    setLoading(false);
                    return updateError('Incorrecto el procesamiento', setError)
                }
            } catch (error) {
                setLoading(false);
                console.log('error', error);
            }
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
            <View style={styles.container}>
                <View style={{ backgroundColor: '#0088ff15', borderRadius: 10, marginLeft: 15, marginRight: 15, marginTop: 35 }}>
                    {
                        !sendCode ?
                            <>
                                <SubTitle title="Cambiar Contraseña" />
                                {
                                    (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                                }
                                <InpuText label="Email" placeholder="Ingresar Email" autoCapitalize='none' value={email}
                                    onChangeText={(value) => handleOnChangeText(value, 'email')} />
                                <BtnNext activeOpacity={0.8} title="Enviar Codigo" onPress={() => sumbitForm()} />
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

                                            <InpuText value={code} keyboardType='numeric' styles={{ borderWidth: 1, borderRadius: 7 }}
                                                onChangeText={(value) => handleOnChangeText(value, 'code')} textAlign={'center'} style={{ fontSize: 30 }} />

                                            <BtnNext activeOpacity={0.8} title="Validar" onPress={() => validationCode()} />
                                        </>
                                        :
                                        <>
                                            {
                                                !passwordChange ?
                                                    <>
                                                        <SubTitle title="Cambiar Contraseña" />
                                                        {
                                                            (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                                                        }

                                                        <InpuText placeholder="Ingresar la clave en los campos de abajo!" editable={false} />

                                                        <InpuText label="Password" placeholder="Ingresar Password" secureTextEntry autoCapitalize='none' value={password}
                                                            onChangeText={(value) => handleOnChangeText(value, 'password')} />

                                                        <InpuText label="Repetir Password" placeholder="Repetir Password" secureTextEntry autoCapitalize='none' value={repeatPassword}
                                                            onChangeText={(value) => handleOnChangeText(value, 'repeatPassword')} />

                                                        <BtnNext activeOpacity={0.8} title="Validar" onPress={() => passwordChangeFunct()} />
                                                    </>
                                                    :
                                                    <>
                                                        <SubTitle title="Password cambiada con exito!" />
                                                        <BtnBack title="Atras" onPress={() => navigation.goBack()} />
                                                    </>
                                            }
                                        </>
                                }
                            </>
                    }
                </View>
            </View>
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