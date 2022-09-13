import React, { useEffect, useState } from 'react';
import { CognitoApi } from '../api/cognito';

const LoginPage = () => {
  const [cognitoUrlLogin, setCognitoUrlLogin] = useState('');
  const [cognitoUrlSignup, setCognitoUrlSignup] = useState('');

  useEffect(() => {
    CognitoApi.createCognitoUrl().then(response => {
      //console.log(response);
      setCognitoUrlLogin(response);
      setCognitoUrlSignup(response.replace("oauth2/authorize","signup"));
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
      {cognitoUrlLogin && cognitoUrlSignup && 
        (
          <>
            <div style={{ position: 'absolute', left: "50%", top: "30%"}}><a href={cognitoUrlLogin}>Login</a></div>
            <div style={{ position: 'absolute', left: "50%", top: "40%"}}><a href={cognitoUrlSignup}>Signup</a></div>
          </>
        )
      }
    </>
  )
}

export default LoginPage;