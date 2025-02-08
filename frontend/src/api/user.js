import axios from "axios";

const url = 'http://localhost:3000/user';

const errorAlert = {
    status: 'error',
    data: null,
    message: 'call api error - frondend',
}

export async function getByEmailAndPassword(param) {
    try {
        console.log(param);
        const result = await axios.post(`${url}/login`, param);
        return result.data;
    } catch (error) {
        console.error(error);
        return errorAlert;
    }
}


export async function registration(params) {
    try {
        const result = await axios.post(`${url}/create`, params);
        return result.data;
    } catch (error) {
        console.error(error);
        return errorAlert;
    }
}