import React from 'react';
import { Link } from "react-router-dom";

import PageHeader from '../components/PageHeader'
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div>
      <PageHeader />
      <Login />
      <div>Don't have an account? Click <Link to='/register'>here</Link> to create an account</div>
    </div>
  )
}

export default LoginPage;
