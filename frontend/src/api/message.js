import axios from "axios";

const url = 'http://localhost:3000/message';

const errorAlert = {
    status: 'error',
    data: null,
    message: 'call api error - frondend',
}

export async function getAllMessage(id) {
    try {
        const res = await axios.get(`${url}/all/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
        return errorAlert;
    }   
}