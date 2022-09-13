import { api_gateway } from "../config/api_gateway.jsx";
import authUtils from "../utils/authUtils.jsx";
import axios from 'axios'

export const OrdersApi = {
    getOrders: async () => {
        const headers = authUtils.getAuthHeader();
        const response = await axios.get(`${api_gateway.url}orders`, {headers});
        return response.data;
    },
    upsertOrder: async (order) => {
        const response = await axios.post(`${api_gateway.url}order`, order);
        return response.data;
    }
}