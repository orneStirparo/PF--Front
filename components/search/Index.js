import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import GlobalContext from "../global/context";
import { getCategories } from "../../utils/api";
import Card from "./Card";
import Loading from "../loading/Loading";
import HeaderUser from "../header/HeaderUser";

export default function Categories({ navigation }) {

    console.log("components search Categories");

    const [category, setCategory] = useState([]);
    const { authData } = useContext(GlobalContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onload();
    }, []);

    async function onload() {
        setLoading(true);
        try {
            const result = await getCategories(authData.token);
            if (result && result.success && result.data.length > 0) {
                setCategory(res => res = result.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Loading loading={loading}>
            <View style={{ height: '100%' }}>
                <HeaderUser title={'Categorias'} visibleGoBack={false} />
                <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={false} onRefresh={onload} />}>
                    {
                        (category.length > 0) ?
                            <>
                                {/* <FlatList
                            data={category}
                            keyExtractor={(item, index) => 'key' + index}
                            renderItem={({ item }) => <Card category={item} navigation={navigation} />}
                            refreshing={false}
                            onRefresh={() => onload()}
                        /> */}
                                <Card category={category} navigation={navigation} />
                            </>
                            :
                            null
                    }

                </ScrollView>
            </View>
        </Loading>
    )
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
})