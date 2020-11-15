import React from 'react';
import { Link } from "react-router-dom";
import Register from '../components/Register';
import { Container, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {
  return (
    <div className="outer">
        <div className="inner">
          <Register />
        </div>
      </div>
  )
}

export default RegisterPage;
