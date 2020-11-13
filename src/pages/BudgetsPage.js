import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import PageNav from '../components/PageNav';
import LogOutButton from '../components/LogOutButton';
import LoggedInName from '../components/LoggedInName';
import Budgets from '../components/Budgets';

const BudgetsPage = () =>
{
    return(
      <Container fluid>

        <Row>
          <Col></Col>
          <Col className="col-6">
            <PageNav home={"fa fa-home fa-2x circle-icon"}
            budget={"material-icons md-48 circle-icon-selected"}
            leaderboard={"fa fa-trophy fa-2x circle-icon"}/>
          </Col>
          <Col>
            <LogOutButton />
          </Col>
        </Row>

        <Row>
          <Col></Col>
          <Col>
            <Budgets />
          </Col>
          <Col>
            <LoggedInName />
          </Col>
        </Row>

      </Container>
    );
}

export default BudgetsPage;
