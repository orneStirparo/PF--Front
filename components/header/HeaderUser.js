import react from "react";
import { Text, View, StyleSheet } from "react-native";
import { EvilIcons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function Header({ navigation, title, visibleGoBack, verified }) {

    console.log("components groupsByCategory HeaderUser");

    return (
        <View style={styles.container}>
            <View style={styles.containerElement}>
                {
                    visibleGoBack ?
                        <>
                            <View style={{ marginLeft: 20 }}>
                                <EvilIcons name="arrow-left" size={33} color="#0088ff" onPress={() => { navigation.goBack() }} />
                            </View>
                        </>
                        :
                        null
                }
                <View style={{ marginLeft: 20 }}>
                    {
                        title.length > 22 ?
                            <>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.title}>{title.substr(0, 22).trim()}...</Text>
                                    {
                                        verified == true || verified == 'true' ?
                                            <>
                                                <MaterialIcons name="verified" size={18} color="#1e88e5" style={{ marginLeft: 2 }} />
                                            </> :
                                            <></>
                                    }
                                </View>
                            </>
                            :
                            <>
                                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                                    <Text style={styles.title}>{title}</Text>
                                    {
                                        verified == true || verified == 'true' ?
                                            <>
                                                <MaterialIcons name="verified" size={18} color="#1e88e5" style={{ marginLeft: 2 }} />
                                            </> :
                                            <></>
                                    }
                                </View>
                            </>
                    }

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 65,
        flexDirection: "row",
        marginTop: Constants.statusBarHeight,
        //backgroundColor: "#9c9c9c03",
        backgroundColor: "#fff",
        alignItems: "center",
        alignContent: "center",
        elevation: 1,
    },
    title: {
        fontSize: 17,
        color: "#0088ff",
    },
    containerElement: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
});