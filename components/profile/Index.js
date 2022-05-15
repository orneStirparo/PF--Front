import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { RefreshControl, ScrollView, View, Text } from 'react-native'
import Portada from './Portada'
import GlobalContext from "../global/context";
import {getUser} from "../../utils/api";
import Loading from "../loading/Loading";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Options from "./Options";
import HeaderAdmin from "../header/HeaderAdmin";
import Body from "./Body";

export default function Index({ navigation }) {

    console.log("components profile Index");

    const { authData } = useContext(GlobalContext);
    const [user, setUser] = useState(authData);
    const [loading, setLoading] = useState(true);
    const snapPoints = ['35%'];
    const sheetRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSheetChanges = useCallback((index) => {
        sheetRef.current.snapToIndex(index);
        console.log('handleSheetChanges', index);
        if (index == 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        onRefresh();
    }, [])

    const onRefresh = async () => {
        setLoading(true);
        try {
            const result = await getUser(authData._id, authData.token);
            if (result && result.success) {
                setUser(result.data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <Loading loading={loading}>

            <HeaderAdmin navigation={navigation} title={user.name} onPress={handleSheetChanges}
                visibleGoBack={false} valueOnPress={0} nameIcon={'menu'} />

            <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}>
                <View>
                    {
                        (user._id) ?
                            <>
                                <View>
                                    <Portada user={user} onRefresh={onRefresh} navigation={navigation} setLoading={setLoading} />
                                </View>
                                <View>
                                    <Body user={user} onRefresh={onRefresh} navigation={navigation} token={authData.token} idUser={authData._id} />
                                </View>
                                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Participaciones</Text>
                                    
                                </View> */}
                            </>
                            :
                            <>
                                <View>
                                    <Text></Text>
                                </View>
                            </>
                    }
                </View>
            </ScrollView>
            <BottomSheet
                ref={sheetRef}
                index={isOpen ? 0 : -1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={() => setIsOpen(false)}
                bottomInset={25}
                detached={true}
                onChange={handleSheetChanges}
                style={{ marginHorizontal: 24, borderColor: '#87CEFA', borderWidth: 2, borderRadius: 18, elevation: 10 }}
            >
                <BottomSheetView>
                    <Options navigation={navigation} />
                </BottomSheetView>
            </BottomSheet>

        </Loading>
    )
}