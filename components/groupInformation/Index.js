import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View, Dimensions, Animated, Text } from 'react-native'
import Loading from '../loading/Loading'
import Portada from './PortadaGroup';
import { getGroup as getGroupA, getEventsGroup as getEventsGroupA } from "../../utils/api";
import GlobalContext from "../global/context";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Options from "./Options";
import HeaderUser from "../header/HeaderUser";
import HeaderAdmin from "../header/HeaderAdmin";
import Body from './Body';
import { EvilIcons } from '@expo/vector-icons';

export default function Index({ group, navigation }) {

    console.log("components groupInformation Index");

    const [loading, setLoading] = useState(true);
    const { authData } = useContext(GlobalContext);
    const [groupData, setGroupData] = useState(group);
    const sheetRef = useRef(null);
    const [value, setValue] = useState(-1);
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState('');
    const scrollViewRef = useRef();
    const snapPoints = ['35%'];

    const handleSheetChanges = useCallback((index, value, id) => {
        if (value === 0) {
            setValue(0);
            setTimeout(() => {
                sheetRef.current.snapToIndex(index);
            }, 200);

        }
        if (value === 1) {
            setValue(1);
            setTimeout(() => {
                sheetRef.current.snapToIndex(index);
            }, 200);
        }

        if (value === 2) {
            setValue(2);
            setEventId(id);
            setTimeout(() => {
                sheetRef.current.snapToIndex(index);
            }, 200);
        }
    }, []);

    useEffect(() => {
        getGroup();
        getEventsGroup();
    }, [])

    const onRefresh = async () => {
        setLoading(true);
        getGroup();
        getEventsGroup();
        setLoading(false);
    }

    const getGroup = async () => {
        try {
            const result = await getGroupA(group._id, authData.token);
            if (result && result.success) {
                setLoading(false);
                setGroupData(result.data);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log('error: ', error);
            setLoading(false);
        }
    }

    const getEventsGroup = async () => {
        try {
            const result = await getEventsGroupA(group._id, authData.token);
            if (result) {
                setEvents(result.data);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    return (
        <Loading loading={loading}>
            {
                groupData.email_owner == authData.email || groupData.administrators.includes(authData._id) ?
                    <>
                        <HeaderAdmin navigation={navigation} title={groupData.nameAvatar}
                            onPress={handleSheetChanges} visibleGoBack={true} valueOnPress={0}
                            nameIcon={'menu'} verified={groupData.verified} />
                    </>
                    :
                    <>
                        <HeaderUser navigation={navigation} title={groupData.nameAvatar} visibleGoBack={true} verified={groupData.verified} />
                    </>
            }
            <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
                <Portada group={groupData} navigation={navigation} onRefresh={onRefresh} handleSheetChanges={handleSheetChanges} />
                {
                    groupData.visibility == 'public' || groupData.followers.includes(authData._id) ?
                        <>
                            <Body group={groupData} navigation={navigation} authData={authData} events={events} handleSheetChanges={handleSheetChanges} />
                        </>
                        :
                        <>
                            <View style={{ width: '100%', height: Dimensions.get('window').height - 450, alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Grupo Privado</Text>
                                <EvilIcons name="lock" size={40} color="black" />
                            </View>
                        </>
                }

            </ScrollView>

            <BottomSheet
                ref={sheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                bottomInset={25}
                detached={true}
                onChange={(index) => {
                    if (index == -1) {
                        setValue(-1);
                    }

                }}
                style={{ marginHorizontal: 24, borderColor: '#87CEFA', borderWidth: 2, borderRadius: 18, elevation: 10 }}
            >
                <BottomSheetView>
                    {
                        value == 0 ?
                            <>
                                <Options navigation={navigation} group={groupData} handleSheetChanges={handleSheetChanges} value={0} />
                            </>
                            :
                            <>
                                {
                                    value == 1 ?
                                        <>
                                            <Options navigation={navigation} handleSheetChanges={handleSheetChanges} value={1} group={groupData} />
                                        </>
                                        :
                                        <>
                                            <Options navigation={navigation} handleSheetChanges={handleSheetChanges} value={2} onRefresh={onRefresh} eventId={eventId} />
                                        </>
                                }
                            </>
                    }
                </BottomSheetView>
            </BottomSheet>

        </Loading>
    )
}

const styles = StyleSheet.create({
    borderLeft: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    borderRight: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    }
})