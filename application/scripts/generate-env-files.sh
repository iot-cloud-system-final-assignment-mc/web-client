#!/bin/sh

API_GATEWAY_URL=$(aws cloudformation list-exports --query "Exports[?Name=='Cloud-Systems-IoT-ApiURL'].Value" --output text )
COGNITO_URL=$(aws cloudformation list-exports --query "Exports[?Name=='Cloud-Systems-IoT-CognitoUserPoolProviderURL'].Value" --output text )
COGNITO_APP_CLIENT=$(aws cloudformation list-exports --query "Exports[?Name=='Cloud-Systems-IoT-CognitoUserPoolClientId'].Value" --output text )

ls
mkdir ./src/config

echo "export const api_gateway = {
    url: '${API_GATEWAY_URL}',
    app_client: '5nfdl5n8a1aa3pts1hqsu9oefi',
    domain: 'cloud-systems-iot-project-640339490701'
}; " > ./src/config/api_gateway.jsx

echo "export const cognito = {
    cognito_url: '${COGNITO_URL}/',
    app_client: '${COGNITO_APP_CLIENT}'
};" > ./src/config/cognito.jsx