/* import * as React from "react"
import { Dimensions, StyleSheet, View } from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location";

export default function Maps({ setCoordinates, setNamePlace }) {

    console.log("components event map");

    const [location, setLocation] = React.useState();
    const [errorMsg, setErrorMsg] = React.useState();
    const [region, setRegion] = React.useState({
        latitude: -34.6083,
        longitude: -58.3712,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    })

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
        //console.log('errorMsg', errorMsg);
    } else if (location) {
        text = JSON.stringify(location);
        //console.log('location', location);
    }

    return (
        <View>
            <GooglePlacesAutocomplete
                styles={{
                    container: { flex: 1, zIndex: 1, position: 'absolute', marginLeft: 15, width: Dimensions.get('window').width - 30, marginTop: 10 },
                    listView: { backgroundColor: "white" }
                }}
                placeholder="Search"
                fetchDetails={true}
                GooglePlacesSearchQuery={{
                    rankby: "distance"
                }}
                onPress={(data, details = null) => {
                    setRegion({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    })
                    setCoordinates({
                        lat: details.geometry.location.lat,
                        lng: details.geometry.location.lng
                    })
                    setNamePlace(data.description)
                }}
                query={{
                    key: "AIzaSyAJvjYnX5alFG8m3R2s5CkwlkWP4aMWGJw",
                    language: "en",
                    components: "country:ar",
                    //types: "address" || "establishment" || "geocode",
                    radius: 30000,
                    location: `${region.latitude}, ${region.longitude}`
                }}
            />
            <View style={{ width: '100%', height: '100%' }}>
                <MapView
                    style={styles.map}
                    region={region}
                    provider="google"
                >
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 500,
    },
}) */