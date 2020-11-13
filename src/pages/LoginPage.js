import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="outer">
        <div className="inner-login">
          <Login />
        </div>
      </div>
  )
}

export default LoginPage;
