import react from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons, EvilIcons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

export default function HeaderAdmin({ navigation, title, onPress, visibleGoBack, valueOnPress, nameIcon, verified }) {

  console.log("components groupInformation HeaderAdmin", nameIcon);


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
        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.title, { marginLeft: visibleGoBack ? -10 : 20 }]}>{title.substr(0, 15).trim()}</Text>
          {
            verified == true || verified == 'true' ?
              <>
                <MaterialIcons name="verified" size={18} color="#1e88e5" style={{ marginLeft: 2 }} />
              </> :
              <></>
          }
        </View>
        <View style={{ marginRight: 20 }}>
          <Ionicons name={nameIcon} size={26} color="#0088ff"
            onPress={() => {
              onPress(0, valueOnPress);
            }} />
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
    marginLeft: 15,
  },
  containerElement: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});