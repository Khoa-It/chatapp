import axios from "axios";

const url = 'http://localhost:3000/message';

const errorAlert = {
    status: 'error',
    data: null,
    message: 'call api error - frondend',
}

export async function apiGetAllMessage(id) {
    try {
        const res = await axios.get(`${url}/all/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return errorAlert;
    }   
}

export function castResponseToArray (data){
    if(data == null) data = [];
    return Array.isArray(data) ? data : [data];
}

export async function apiGetMessageByRoomId(room_id) {
    try {        
        const handleUrl = `${url}/${encodeURIComponent(room_id)}`;
        const res = await axios.get(handleUrl); 
        return res.data;
    } catch (error) {
        return errorAlert;
    }
}

export async function apiSendMessage(params) {
    try {
        const res = await axios.post(url, params);
        return res.data;
    } catch (error) {
        return errorAlert;
    }
}