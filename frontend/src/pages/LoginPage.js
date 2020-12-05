import React from 'react';

import Login from '../components/Login';
import Logo from '../components/Logo';
import Title from '../components/Title';

const LoginPage = () => {
  return (
    <div className="outer">
        <Logo />
        <Title />
        <div className="inner-login">
          <Login />
        </div>
      </div>
  )
}

export default LoginPage;
