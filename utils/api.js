import axios from "axios";

const api = 'https://sport--app.herokuapp.com'

export const loginGoogle = async (accessToken) => {
    try {
        const config = {
            method: 'post',
            url: api + '/api/user/login.google',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: { Token: accessToken }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}