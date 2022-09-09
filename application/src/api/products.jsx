import { api_gateway } from "../config/api_gateway.jsx";
import axios from 'axios'

export const ProductsApi = {
    getProducts: async () => {
        const response = await axios.get(`${api_gateway.url}products`);
        return response.data;
    },
    upsertProduct: async (product) => {
        const response = await axios.post(`${api_gateway.url}product`, product);
        return response.data;
    }
}