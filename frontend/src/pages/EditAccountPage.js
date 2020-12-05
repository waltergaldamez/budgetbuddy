import React from 'react';

import EditForm from '../components/EditForm';
import { Container, Row, Col } from 'react-bootstrap';
import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';

const EditAccountPage = () => {
  return (
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
  
    <div className="inner-login">
        <EditForm />
    </div>
    </Container>
  )
}

export default EditAccountPage;