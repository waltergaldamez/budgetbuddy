import React from 'react';

import HomePageHeader from '../components/HomePageHeader';
import LoggedInName from '../components/LoggedInName';

import { Container, Row, Col } from 'react-bootstrap';
//import FindUser from '../components/FindUser';
//import AddFriend from '../components/AddFriend';

const HomePage = () =>
{
    return(
      <Container fluid>
        <Row>
          <Col>
            <HomePageHeader />
          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <LoggedInName />
          </Col>
        </Row>
      </Container>
    );
};

export default HomePage;
