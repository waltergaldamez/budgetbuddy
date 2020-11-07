import React from 'react';
import { Link } from "react-router-dom";
import Register from '../components/Register';
import { Container, Row, Col } from 'react-bootstrap';

const RegisterPage = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <h1 style={{textAlign: "center"}}> Sign Up!</h1>
          <Register />
        </Col>
        <Col> </Col>
      </Row>
    </Container>
  )
}

export default RegisterPage;
