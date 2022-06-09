import axios from "axios";

const api = 'https://teamsportdev.herokuapp.com/api/v1/'

async function loginGoogle(accessToken) {
    try {
        const config = {
            method: 'post',
            url: api + 'loginGoogle',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: { Token: accessToken }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function login(email, password) {
    console.log(email, password);
    try {
        const config = {
            method: 'post',
            url: api + 'login',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: {
                email: email,
                password: password
            }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function register(name, email, password, repeatPassword) {
    try {
        const config = {
            method: 'post',
            url: api + 'register',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: {
                name: name,
                email: email,
                password: password
            }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function validationCode(email, code) {
    try {
        const config = {
            method: 'post',
            url: api + 'codeVerification',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: {
                email: email,
                codeVerification: code
            }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function generateCode(email) {
    try {
        const config = {
            method: 'post',
            url: api + 'user/generate.code',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: {
                email: email,
            }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function changePassword(email, password, repeatPassword, code) {
    try {
        const config = {
            method: 'post',
            url: api + 'user/change.password',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', },
            data: {
                email: email,
                password: password,
                repeatPassword: repeatPassword,
                code: code
            }
        }
        const user = await axios(config);
        return user.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function groupsForCategory(category, token) {
    try {
        const url = api + 'groups/' + category; //`${URL_GROUPS}${category}`
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data
    } catch (error) {
        console.log('error: ', error);
    }
}

async function followGroup(id_user, id_group, token) {
    try {
        const config = {
            method: 'post',
            url: api + 'group/user', //URL_ADD_USER_GROUP,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                user_id: id_user,
                group_id: id_group,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function myGroups(id_user, token) {
    try {
        const url = api + 'groups/user/' + id_user; //`${URL_MY_GROUPS}${id_user}`;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function updateImageProfile(id, image, token, item) {
    try {
        const data = new FormData();
        data.append('image', { uri: image, name: 'image.jpg', type: 'image/jpg' });
        data.append('item', item);
        const config = {
            method: 'post',
            url: api + 'user/image/' + id, //`${URL_PROFILE_USER_IMAGE}${id}`,
            headers: { 'Authorization': 'Bearer ' + token, 'content-type': 'multipart/form-data', Accept: 'application/json' },
            data: data
        };

        const res = await axios(config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

async function updateImageGroup(id, image, token, item) {
    try {
        const data = new FormData();
        data.append('image', { uri: image, name: 'image.jpg', type: 'image/jpg' });
        data.append('item', item);
        const config = {
            method: 'post',
            url: api + 'group/image/' + id, //`${CHANGE_IMAGE_GROUP}${id}`,
            headers: { 'Authorization': 'Bearer ' + token, 'content-type': 'multipart/form-data', Accept: 'application/json' },
            data: data
        };
        const res = await axios(config);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

async function getCategories(token) {
    try {
        const url = api + 'categories'; //URL_CATEGORIES;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function postGroup(name, category, visibility, city, town, email_owner, whatsapp, instagram, token) {
    try {
        const config = {
            method: 'post',
            url: api + 'group', //GROUP,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                name: name,
                category: category,
                visibility: visibility,
                city: city,
                town: town,
                email_owner: email_owner,
                whatsApp: whatsapp,
                instagram: instagram
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('errorrrrr: ', error.response.status);
        throw error.response.status;
    }
}

async function getRequets(id_user, token) {
    try {
        const url = api + 'requestsFollowers/' + id_user; //`${REQUESTS_GROUP}${id_user}`;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function acceptUser(id_user, id_group, token) {
    try {
        const config = {
            method: 'POST',
            url: api + 'group/userAccept', //ACCEPT_USER,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                user_id: id_user,
                group_id: id_group,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function rejectUser(id_user, id_group, token) {
    try {
        const config = {
            method: 'DELETE',
            url: api + 'group/userDelete', //REJECT_USER,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                user_id: id_user,
                group_id: id_group,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function getUser(id, token) {
    try {
        const url = api + 'user/' + id; //GET_USER + id;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function getGroup(id, token) {
    try {
        const url = api + 'group/' + id; //GROUP + '/' + id;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response);
    }
}

async function postEvent(data) {
    console.log('data: ', data);
    try {
        const config = {
            method: 'post',
            url: api + 'event/' + data.group_id, //NEW_EVENT + data.group_id,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + data.token
            },
            data: {
                title: data.title,
                description: data.description,
                date: data.date,
                time: data.time,
                timeUnix: data.timeUnix,
                /* coordinates: data.coordinates,
                namePlace: data.namePlace, */
                lugar: data.lugar,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('errorrrrr: ', error.response.status);
        throw error.response.data;
    }
}

async function getEvents(id_user, token) {
    try {
        const url = api + 'events/' + id_user; //GET_EVENTS + id_user;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } });
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function postAssist(id_user, event_id, token) {
    try {
        const config = {
            method: 'POST',
            url: api + 'event/assist/' + event_id, //POST_ASSIST + event_id,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                id_user: id_user,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function deleteAssist(id_user, event_id, token) {
    try {
        const config = {
            method: 'DELETE',
            url: api + 'event/assist/' + event_id, //DELETE_ASSISTANT + event_id,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                id_user: id_user,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function getEvent(id, token) {
    try {
        const url = api + 'event/' + id; //GET_EVENT + id;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response);
    }
}

async function getAssistants(id_event, token) {
    try {
        const url = api + 'event/assistants/' + id_event; //GET_ASSISTANTS + id_event;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response);
    }
}

async function getRejects(id_event, token) {
    try {
        const url = api + 'event/reject/' + id_event; //GET_REJECTS + id_event;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response);
    }
}

async function getGroupsFollowing(id_user, token) {
    try {
        const url = api + 'groups/following/' + id_user; //GET_GROUPS_FOLLOWING + id_user;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function getGroupsCreated(id_user, token) {
    try {
        const url = api + 'groups/created/' + id_user; //GET_GROUPS_CREATED + id_user;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error);
    }
}

async function getFollowers(id_grupo, token) {
    try {
        const url = api + 'group/followers/' + id_grupo; //GET_FOLLOWERS + id_grupo;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function deleteFollow(id_user, id_group, token) {
    try {
        const config = {
            method: 'post',
            url: api + 'group/unfollower', //DELETE_FOLLOW,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                user_id: id_user,
                group_id: id_group,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function deleteRequest(id_user, id_group, token) {
    try {
        const config = {
            method: 'post',
            url: api + 'group/unrequested', //DELETE_REQUEST,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                user_id: id_user,
                group_id: id_group,
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function getEventsGroup(id_grupo, token) {
    try {
        const url = api + 'events/group/' + id_grupo; //GET_EVENTS_GROUP + id_grupo;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function getAllEventsUser(id_user, token) {
    try {
        const url = api + 'events/user/' + id_user; //GET_EVENTS_USER + id_user;
        const result = await axios.get(url, { headers: { 'Authorization': 'Bearer ' + token } })
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function deleteEvent(id, token) {
    try {
        const config = {
            method: 'delete',
            url: api + 'event/', //DELETE_EVENT,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                id: id
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('error: ', error.response.data);
    }
}

async function postAdmin(id_group, email_admin, token) {
    try {
        const config = {
            method: 'post',
            url: api + 'group/admin/' + id_group, //POST_ADMIN + id_group,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            data: {
                email_admin: email_admin
            }
        }
        const result = await axios(config);
        return result.data;
    } catch (error) {
        console.log('errorrrrr: ', error.response.status);
        throw error.response.data;
    }
}

export {
    login,
    register,
    validationCode,
    generateCode,
    changePassword,
    groupsForCategory,
    followGroup,
    myGroups,
    updateImageProfile,
    getCategories,
    loginGoogle,
    postGroup,
    updateImageGroup,
    getRequets,
    acceptUser,
    rejectUser,
    getUser,
    getGroup,
    postEvent,
    getEvents,
    postAssist,
    getEvent,
    getAssistants,
    deleteAssist,
    getGroupsFollowing,
    getGroupsCreated,
    getFollowers,
    deleteFollow,
    deleteRequest,
    getEventsGroup,
    getAllEventsUser,
    getRejects,
    deleteEvent,
    postAdmin
};