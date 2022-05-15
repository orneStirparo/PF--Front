import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, Platform, TouchableOpacity, ScrollView, Button, Alert, LogBox } from 'react-native';
import Datetimepicker from "@react-native-community/datetimepicker";
import api from "../../utils/api";
import GlobalContext from "../global/context";
import Loading from "../loading/Loading";
/* import SearchLocation from "./map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"; */
import InpuText from "../TextInput/Index";
import BtnNext from "../Buttom/Index";

export default function Index({ navigation, group }) {

    console.log('components event Index');

    const { authData } = useContext(GlobalContext);
    const [event, setEvent] = useState({
        title: '',
        descripcion: '',
        lugar: '',
    });
    const [fecha, setFecha] = useState();
    const [timeUnix, setTimeUnix] = useState();
    const [hora, setHora] = useState();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [error, setError] = useState('');
    const [coordinates, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    })
    const [loading, setLoading] = useState(false);
    const [namePlace, setNamePlace] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const sheetRef = useRef(null);
    const { title, descripcion, lugar } = event;
    const snapPoints = ['85%'];

    const handleOnChangeText = (value, fieldName) => {
        setEvent({
            ...event,
            [fieldName]: value
        })
    }
    const onChange = (event, selectedData) => {
        const currentDate = selectedData || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        setTimeUnix(Date.parse(tempDate));
        const day = tempDate.getDate();
        const month = tempDate.getMonth() + 1;
        const year = tempDate.getFullYear();
        const fDate = (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + month : month) + '/' + year;
        const hours = tempDate.getHours();
        const minutes = tempDate.getMinutes();
        const fTime = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);

        if (mode == 'date') {
            setFecha(fDate);
        }
        else {
            setHora(fTime);
        }
        //setShow(false);
    }
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    }

    const handleSheetChanges = useCallback((index) => {
        sheetRef.current.snapToIndex(index);
    })
    const updateError = (error, stateUpdater) => {
        stateUpdater(error);
        Alert.alert('Error', error);
        setTimeout(() => {
            stateUpdater('');
        }, 2500);
    }
    const isValidForm = () => {
        /* if (!isValidObjeField(userInfo))
            return updateError('Required all fields ', setError) */
        if (!title.trim() || title.length < 4)
            return updateError('Titulo Invalido, debe tener mas de 4 letras! ', setError)
        if (!fecha)
            return updateError('Elegir fecha del evento ', setError)
        if (!hora)
            return updateError('Elegir hora del evento ', setError)
        if (!descripcion.trim() || descripcion.length < 4)
            return updateError('Breve descripcion del evento', setError)
        if (!lugar.trim() || lugar.length < 4)
            return updateError('lugar Invalido, debe tener mas de 7 letras! ', setError)
        /* if (!namePlace.trim() || namePlace.length < 4)
            return updateError('Seleccionar punto de encuentro ', setError)
        if (coordinates.lat == 0 || coordinates.lng == 0 || coordinates.lng == undefined || coordinates.lat == undefined)
            return updateError('Seleccionar privacidad del grupo ', setError) */
        return true;
    }
    const sumbitForm = async () => {
        if (isValidForm()) {
            setLoading(true);
            try {
                const data = {
                    title: title,
                    description: descripcion,
                    date: fecha,
                    time: hora,
                    timeUnix: timeUnix,
                    /* namePlace: namePlace,
                    coordinates: {
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                    }, */
                    lugar: lugar,
                    group_id: group._id,
                    token: authData.token
                }
                const result = await api.postEvent(data);
                if (result && result.success) {
                    setEvent({
                        title: '',
                        descripcion: '',
                        lugar: '',
                    });
                    setFecha();
                    setTimeUnix();
                    setHora();
                    setDate(new Date());
                    setShow(false);
                    setError('');
                    setCoordinates({
                        latitude: 0,
                        longitude: 0,
                    });
                    setNamePlace('');
                    setLoading(false);
                    Alert.alert('Evento creado con exito!');
                    //navigation.goBack();
                    //setCreate(true);
                    //navigation.navigate('Events', { group: group });
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log('error', error);
                setLoading(false);
            }
        }
    }

    return (
        <Loading loading={loading}>
            <View style={styles.container}>

                <ScrollView>
                    {
                        (error) ? <Text style={{ color: 'red', fontSize: 18, textAlign: 'center' }}>{error}</Text> : null
                    }

                    <InpuText label={'Titulo'} placeholder="Nombre del Evento" value={title} autoCapitalize="words"
                        onChangeText={(value) => handleOnChangeText(value, 'title')} />

                    <InpuText label={'Descripcion'} placeholder="Descripcion del Evento" value={descripcion}
                        onChangeText={(value) => handleOnChangeText(value, 'descripcion')} multiline={true}
                        numberOfLines={3} maxLength={5000} editable={true} />

                    <InpuText label={'Punto de Encuentro'} placeholder="Introduzca Pto. encuentro" value={lugar} autoCapitalize="words"
                        onChangeText={(value) => handleOnChangeText(value, 'lugar')} />

                    {
                        Platform.OS === 'android' ?
                            <>
                                <TouchableOpacity onPress={() => { showMode('date') }} activeOpacity={0.5}>
                                    <InpuText label={'Fecha'} placeholder="DD/MM/AA" value={fecha} editable={false} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { showMode('time') }} activeOpacity={0.5}>
                                    <InpuText label={'Hora'} placeholder="HH:MM" value={hora} editable={false} />
                                </TouchableOpacity>

                                {/* <View style={styles.campo}>
                                    <Text style={styles.text}>Pto de encuentro</Text><TouchableOpacity activeOpacity={0.8}
                                        onPress={() => {
                                            handleSheetChanges(0)
                                            setIsOpen(true)
                                        }}>
                                        <TextInput style={styles.input} placeholder='Pto. encuentro' value={namePlace} editable={false} placeholderTextColor={'#000'} />
                                    </TouchableOpacity>
                                </View> */}
                            </>
                            :
                            <>
                                {/* <View>
                                    <Button title='Pto. encuentro' onPress={() => {
                                        handleSheetChanges(0)
                                        setIsOpen(true)
                                    }} />
                                    <TextInput style={styles.input} placeholder='Pto. encuentro' value={namePlace} editable={false} placeholderTextColor={'#000'} />
                                </View> */}

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                                    <View>
                                        <Button title='Fecha' onPress={() => { showMode('date') }} />
                                        <TextInput style={styles.input} value={fecha} editable={false} placeholderTextColor={'#000'} />
                                    </View>
                                    <View>
                                        <Button title='Hora' onPress={() => { showMode('time') }} />
                                        <TextInput style={styles.input} value={hora} editable={false} placeholderTextColor={'#000'} />
                                    </View>
                                </View>
                            </>
                    }

                    {
                        show && (
                            <Datetimepicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                onChange={onChange}
                                is24Hour={true}
                                display="default"
                                style={{ marginBottom: 20, marginTop: 10 }}
                            />
                        )
                    }

                    <BtnNext activeOpacity={0.8} title="Crear Evento" onPress={() => sumbitForm()} />
                </ScrollView>

                {/* <BottomSheet
                    ref={sheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}>
                    <BottomSheetView>
                        <SearchLocation setCoordinates={setCoordinates} setNamePlace={setNamePlace} />
                    </BottomSheetView>
                </BottomSheet> */}
            </View>

        </Loading >
    );
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 10,
    },
    input: {
        fontSize: 17.5,
        justifyContent: 'center',
        color: '#000',
        marginLeft: 10,
    },
    campo: {
        backgroundColor: '#CDCDCD40',
        borderRadius: 7,
        marginBottom: 20,
    },
});