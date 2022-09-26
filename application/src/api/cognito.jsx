import { cognito } from "../config/cognito.jsx";
import axios from 'axios'

export const CognitoApi = {
    getCognitoOIDCConfig: async () => {
        const response = await axios.get(`${cognito.cognito_url}/.well-known/openid-configuration`);
        return response.data;
    },
    createCognitoUrl: async () => {
        const oidc = await CognitoApi.getCognitoOIDCConfig();
        const url = oidc.authorization_endpoint;
        const clientId = cognito.app_client;
        const redirectUrl = window.location.href;
        const state = "state";
        const responseType = "token";
        const scope = "openid";
        const queryParams = `?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=${responseType}&scope=${scope}&state=${state}`;
        return url + queryParams;
    },
    logout: async () => {
        CognitoApi.getCognitoOIDCConfig()
            .then((data) => {
                const url = data.authorization_endpoint.replace("/oauth2/authorize", "/logout");
                const clientId = cognito.app_client;
                const redirectUrl = encodeURIComponent(`${window.location.origin}/`);
                const queryParams = `?client_id=${clientId}&logout_uri=${redirectUrl}`;
                localStorage.clear();
                window.location.href = `${url}${queryParams}`;
            })
            .catch((error) => {
                console.log(error);
            });
    }
}