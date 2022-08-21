import React from 'react';

import {DashboardLayout} from '../components/Layout';
import { CognitoApi } from '../api/cognito';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <h2>Settings Page</h2>
      <a href="#" onClick={CognitoApi.logout}>Logout</a>
    </DashboardLayout>
  )
}

export default SettingsPage;