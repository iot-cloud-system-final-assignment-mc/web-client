import { api_gateway } from "../config/api_gateway.jsx";
import authUtils from "../utils/authUtils.jsx";
import axios from 'axios'

export const ProductsApi = {
    getProducts: async () => {
        const headers = authUtils.getAuthHeader();
        const response = await axios.get(`${api_gateway.url}products`, {headers});
        return response.data;
    },
    upsertProduct: async (product) => {
        const response = await axios.post(`${api_gateway.url}product`, product);
        return response.data;
    }
}