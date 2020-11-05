import React from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';


import PageHeader from '../components/PageHeader'
import Login from '../components/Login';

const LoginPage = () => {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <PageHeader />
          <Login />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default LoginPage;
