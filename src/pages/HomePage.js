import React from 'react';

import HomePageHeader from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import LoggedInName from '../components/LoggedInName';

import { Container, Row, Col } from 'react-bootstrap';
//import FindUser from '../components/FindUser';
//import AddFriend from '../components/AddFriend';

const HomePage = () =>
{
    return(
      <Container fluid>

        <Row>
          <Col></Col>
          <Col className="col-6">
            <PageNav home={"fa fa-home fa-2x circle-icon-selected"}
            budget={"material-icons md-48 circle-icon"}
            leaderboard={"fa fa-trophy fa-2x circle-icon"}/>
          </Col>
          <Col>
            <LogOutButton />
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
