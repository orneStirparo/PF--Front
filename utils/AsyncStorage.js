import Storage from "@react-native-async-storage/async-storage";

const AsyncStorage = {}

AsyncStorage.storeData = async (key, value) => {
    try {
        await Storage.setItem(key, JSON.stringify(value))
    } catch (e) {
        // saving error
    }
}


AsyncStorage.getData = async (key) => {
    try {
        const value = await Storage.getItem(key)
        return JSON.parse(value)
    } catch (e) {
        // error reading value
    }
}

AsyncStorage.clearAll = async () => {
    try {
        return await Storage.clear()
    } catch (e) {
        // error reading value
    }
}

export default AsyncStorage;