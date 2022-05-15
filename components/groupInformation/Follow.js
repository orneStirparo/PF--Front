import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import GlobalContext from "../global/context";
import { followGroup as followGroupA, deleteFollow as deleteFollowA, deleteRequest as deleteRequestA } from "../../utils/api";

export default function Follow({ group, onRefresh }) {

    console.log("components groupInformation Follow");

    const { authData } = useContext(GlobalContext);

    const followGroup = async () => {
        try {
            const result = await followGroupA(authData._id, group._id, authData.token);
            if (result.success) {
                onRefresh();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteFollow = async () => {
        try {
            const result = await deleteFollowA(authData._id, group._id, authData.token);
            if (result.success) {
                onRefresh();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteRequest = async () => {
        try {
            const result = await deleteRequestA(authData._id, group._id, authData.token);
            if (result.success) {
                onRefresh();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                (!group.followers.includes(authData._id) && !group.requests.includes(authData._id)) ?
                    <>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => { followGroup(); }}>
                            <View style={styles.follow}>
                                <Text style={{ fontSize: 17, color: '#fff' }}>seguir</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    <>
                        {
                            group.followers.includes(authData._id) ?
                                <>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => { deleteFollow(); }}>
                                        <View style={styles.unfollow}>
                                            <Text style={{ fontSize: 17, color: '#000' }}>siguiendo</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>
                                :
                                <>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => { deleteRequest(); }}>
                                        <View style={styles.pendiente}>
                                            <Text style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}>pendiente</Text>
                                        </View>
                                    </TouchableOpacity>
                                </>

                        }
                    </>
            }
        </>

    );
}

const styles = StyleSheet.create({
    follow: {
        backgroundColor: '#4285F4',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 110,
        borderWidth: 1
    },
    unfollow: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 110,
        borderWidth: 1,
        elevation: 5
    },
    pendiente: {
        backgroundColor: '#4285F499',
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 110,
        borderWidth: 1
    }
})