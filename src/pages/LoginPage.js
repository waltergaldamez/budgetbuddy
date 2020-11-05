import React from 'react';
import { Link } from "react-router-dom";

import PageHeader from '../components/PageHeader'
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <PageHeader />
        <Login />
      </div>
    </div>
  )
}

export default LoginPage;
