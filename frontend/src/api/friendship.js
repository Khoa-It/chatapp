import axios from "axios";

const url = 'http://localhost:3000/friendship';

export async function getRelationShip(id) {
    try {
        const response = await axios.get(`${url}/relationships/${id}`);
        return response.data;
    } catch (error) {
        return null;
    }
}