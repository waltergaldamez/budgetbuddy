import React from 'react';
import { Link } from "react-router-dom";
import Register from '../components/Register';
import Logo from '../components/Logo';
import { Container, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {
  return (
    <div className="outer">
      <Logo />
      <div className="inner">
        <Register />
      </div>
    </div>
  )
}

export default RegisterPage;
