import React from 'react';

import Login from '../components/Login';
import Logo from '../components/Logo';

const LoginPage = () => {
  return (
    <div className="outer">
        <Logo />
        <div className="inner-login">
          <Login />
        </div>
      </div>
  )
}

export default LoginPage;
