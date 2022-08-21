import React, { useEffect, useState } from 'react';
import { CognitoApi } from '../api/cognito';

const LoginPage = () => {
  const [cognitoUrl, setCognitoUrl] = useState('');

  useEffect(() => {
    CognitoApi.createCognitoUrl().then(response => {
      //console.log(response);
      setCognitoUrl(response);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if (window.location.hash && window.location.hash.length > 0) {
      let lochash = window.location.hash.substring(1);
      lochash
        .split("&")
        .map((v) => v.split("="))
        .reduce((acc, v) => {
          localStorage.setItem(v[0], v[1]);
          acc[v[0]] = v[1];
          return acc;
        }, {});
    }
  }, []);

  return (
    <>
      {cognitoUrl && <a href={cognitoUrl}>Login</a>}
    </>
  )
}

export default LoginPage;