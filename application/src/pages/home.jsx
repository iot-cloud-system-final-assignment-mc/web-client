import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {DashboardLayout} from '../components/Layout';

const HomePage = () => {
  const history = useHistory();
  useEffect(() => {
    if(window.location.hash.length > 0) {
      history.push('/');
    }
  } , [history]);
  return (
    <DashboardLayout>
      <h2>Home Page</h2>
    </DashboardLayout>
  )
}

export default HomePage;