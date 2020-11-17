import React from 'react';

import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import LoggedInName from '../components/LoggedInName';
import EditProfile from '../components/EditProfile';

import { Container, Row, Col } from 'react-bootstrap';

const HomePage = () =>
{
    return(
      <Container fluid>
      <div class="color-nav">
        <Row>
          <Col></Col>
          <Col className="col-6">
            <PageNav home={"fa fa-home fa-2x circle-icon-selected"}
            budget={"material-icons md-50 circle-icon"}
            leaderboard={"fa fa-trophy fa-2x circle-icon"}/>
          </Col>
          <Col>
            <LogOutButton />
          </Col>
        </Row>
      </div>

        <Row>
          <Col>
            <EditProfile />
          </Col>
          <Col>
            <LoggedInName />
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
};

export default HomePage;
