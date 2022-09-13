import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {DashboardLayout} from '../components/Layout';
import authUtils from '../utils/authUtils';

const HomePage = () => {
  const payload = authUtils.getIdTokenPayload();
  const isAdmin = payload['cognito:groups'] && payload['cognito:groups'].includes('Admin');
  const username = payload['cognito:username'];
  const history = useHistory();
  useEffect(() => {
    if(window.location.hash.length > 0) {
      history.push('/');
    }
  } , [history]);
  return (
    <DashboardLayout>
      <p className="title">{isAdmin ? "Welcome back Products App!" : `Welcome to Products App, ${username}!`}</p>
      <p className="body">{isAdmin ? "You may proceed adding new products or managing the orders." : `Hey ${username}. If you'd like you can proceed buying a new product! Also, please check your orders to see the status of your active orders!`}</p>
    </DashboardLayout>
  )
}

export default HomePage;