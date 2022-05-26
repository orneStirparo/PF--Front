import * as ImagePicker from "expo-image-picker";
import { updateImageProfile, updateImageGroup } from "./api.js";
import * as ImageManipulator from "expo-image-manipulator";

async function changeImageProfileUser(id, token, item) {
    try {
        let resultImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });

        if (!resultImage.cancelled && resultImage.type === 'image') {
            const file = await ImageManipulator.manipulateAsync(resultImage.uri, [{ resize: { width: 500, } }], { compress: 0.5 });
            const result = await updateImageProfile(id, file.uri, token, item);
            if (result && result.success)
                return result
        }
        return null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


async function changeImageGroup(id, token, item) {
    try {
        let resultImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            //allowsEditing: true,
            aspect: [4, 3],
            quality: 0,
        });

        if (!resultImage.cancelled && resultImage.type === 'image') {
            const file = await ImageManipulator.manipulateAsync(resultImage.uri, [{ resize: { width: 500, } }], { compress: 0.5 });
            const result = await updateImageGroup(id, resultImage.uri, token, item);
            if (result && result.success)
                return result
        }
        return null;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default { changeImageProfileUser, changeImageGroup };